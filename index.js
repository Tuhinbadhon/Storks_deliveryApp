const express = require("express");
const cors = require("cors");
const app = express();

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const port = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "https://storksdel.netlify.app"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cauvj2c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect to the MongoDB cluster
    // await client.connect();

    const userCollection = client.db("Storks").collection("users");
    const parcelCollection = client.db("Storks").collection("parcels");
    const paymentCollection = client.db("Storks").collection("payments");
    const reviewCollection = client.db("Storks").collection("reviews");

    // jwt related api
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });
      res.send({ token });
    });
    // middlewares
    const verifyToken = (req, res, next) => {
      // console.log('inside verify token', req.headers.authorization);
      if (!req.headers.authorization) {
        return res.status(401).send({ message: "unauthorized access" });
      }
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: "unauthorized access" });
        }
        req.decoded = decoded;
        next();
      });
    };
    // use verify admin after verifyToken
    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await userCollection.findOne(query);
      const isAdmin = user?.role === "admin";
      if (!isAdmin) {
        return res.status(403).send({ message: "forbidden access" });
      }
      next();
    };
    // use verify Delivery-Man after verifyToken
    const verifyDeliveryMan = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await userCollection.findOne(query);
      const isDeliveryMan = user?.role === "Delivery-Man";
      if (!isDeliveryMan) {
        return res.status(403).send({ message: "forbidden access" });
      }
      next();
    };
    // users related api
    app.get("/users", async (req, res) => {
      // console.log(req.headers);
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    app.get("/users/admin/:email", verifyToken, async (req, res) => {
      const email = req.params.email;

      if (email !== req.decoded.email) {
        return res.status(403).send({ message: "forbidden access" });
      }

      const query = { email: email };
      const user = await userCollection.findOne(query);
      let admin = false;
      if (user) {
        admin = user?.role === "admin";
      }
      res.send({ admin });
    });
    // Delivery Man specific API
    app.get("/delivery-men", async (req, res) => {
      try {
        const filter = { role: "Delivery-Man" }; // Filter users with role 'Delivery-Man'
        const deliveryMen = await userCollection.find(filter).toArray();
        res.json(deliveryMen);
      } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
      }
    });
    app.get("/users/deliveryMan/:email", verifyToken, async (req, res) => {
      const email = req.params.email;

      if (email !== req.decoded.email) {
        return res.status(403).send({ message: "forbidden access" });
      }

      const query = { email: email };
      const user = await userCollection.findOne(query);
      let deliveryMan = false;
      if (user) {
        deliveryMan = user?.role === "Delivery-Man";
      }
      res.send({ deliveryMan });
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      // insert email if user doesnt exists:
      // you can do this many ways (1. email unique, 2. upsert 3. simple checking)
      const query = { email: user.email };
      const existingUser = await userCollection.findOne(query);
      if (existingUser) {
        return res.send({ message: "user already exists", insertedId: null });
      }
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    app.patch(
      "/users/admin/:id",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const updatedDoc = {
          $set: {
            role: "admin",
          },
        };
        const result = await userCollection.updateOne(filter, updatedDoc);
        res.send(result);
      }
    );
    app.patch(
      "/users/deliveryMan/:id",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const updatedDoc = {
          $set: {
            role: "Delivery-Man",
          },
        };
        const result = await userCollection.updateOne(filter, updatedDoc);
        res.send(result);
      }
    );

    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });
    // Parcels related API
    // 1. Fetch parcels for logged-in user
    app.get("/parcels/user/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      try {
        const parcels = await parcelCollection.find({ email: email }).toArray();
        res.json(parcels);
      } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
      }
    });
    app.get("/parcels/search", async (req, res) => {
      const { email, startDate, endDate } = req.query;

      if (!email) {
        return res.status(400).send("Email is required.");
      }

      const filter = { email };

      if (startDate || endDate) {
        filter.requestedDeliveryDate = {};
        if (startDate) filter.requestedDeliveryDate.$gte = new Date(startDate);
        if (endDate) filter.requestedDeliveryDate.$lte = new Date(endDate);
      }

      try {
        const parcels = await parcelCollection.find(filter).toArray();
        res.status(200).json(parcels);
      } catch (error) {
        console.error("Error fetching parcels:", error);
        res.status(500).send("Server Error");
      }
    });
    // 2. Update a parcel
    app.patch("/parcels/:id", async (req, res) => {
      const id = req.params.id;
      const updateData = req.body;
      const filter = { _id: new ObjectId(id), status: "pending" }; // Only allow update if status is 'pending'
      const updateDoc = {
        $set: updateData,
      };
      const result = await parcelCollection.updateOne(filter, updateDoc);
      res.send(result);
    });
    app.patch(
      "/parcels/assign/:id",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const id = req.params.id;
        const { deliveryManId, approximateDeliveryDate, status } = req.body;

        try {
          const filter = { _id: new ObjectId(id) };
          const updateDoc = {
            $set: {
              deliveryManId,
              approximateDeliveryDate,
              status,
            },
          };
          const result = await parcelCollection.updateOne(filter, updateDoc);
          if (result.modifiedCount === 1) {
            res
              .status(200)
              .send({ message: "Delivery man assigned successfully" });
          } else {
            res
              .status(404)
              .send({ message: "Parcel not found or already assigned" });
          }
        } catch (error) {
          console.error("Error assigning delivery man:", error);
          res.status(500).send({ message: "Failed to assign delivery man" });
        }
      }
    );

    // 3. Cancel a parcel
    app.patch("/parcels/cancel/:id", async (req, res) => {
      const id = req.params.id;
      const filter = {
        _id: new ObjectId(id),
        status: { $in: ["pending", "On The Way"] }, // Allow cancel if status is 'pending' or 'on the way'
      };
      const updateDoc = {
        $set: { status: "cancelled" },
      };
      const result = await parcelCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // 1. Book a Parcel
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${day}-${month}-${year}`;
    };
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);
    console.log(formattedDate); // Output will be something like "17-06-2024"
    app.post("/parcels", async (req, res) => {
      try {
        const parcel = req.body;
        parcel.status = "pending"; // Default status
        parcel.bookingDate = formatDate(new Date()); // Auto-generated booking date
        const result = await parcelCollection.insertOne(parcel);
        res.send(result);
      } catch (error) {
        console.error("Error saving parcel:", error);
        res.status(500).send("Error saving parcel");
      }
    });

    app.get("/parcels", async (req, res) => {
      const { email } = req.query; // Extract email from query parameters
      let query = {}; // Default query

      if (email) {
        query = { email }; // If email is provided, filter by email
      }

      const result = await parcelCollection.find(query).toArray();
      res.send(result);
    });
    app.patch("/parcels/deliver/:id", verifyToken, async (req, res) => {
      const parcelId = req.params.id;

      try {
        const filter = { _id: new ObjectId(parcelId) };
        const updateDoc = {
          $set: {
            status: "delivered",
          },
        };

        const result = await parcelCollection.updateOne(filter, updateDoc);
        res.json(result);
      } catch (error) {
        console.error("Error marking parcel as delivered:", error);
        res.status(500).send("Failed to mark parcel as delivered");
      }
    });
    // app.patch("/parcels/cancel/:id", verifyToken, async (req, res) => {
    //   const parcelId = req.params.id;

    //   try {
    //     const filter = { _id: new ObjectId(parcelId) };
    //     const updateDoc = {
    //       $set: {
    //         status: "cancelled",
    //       },
    //     };

    //     const result = await parcelCollection.updateOne(filter, updateDoc);
    //     res.json(result);
    //   } catch (error) {
    //     console.error("Error marking parcel as delivered:", error);
    //     res.status(500).send("Failed to mark parcel as delivered");
    //   }
    // });

    // 3. Update Parcel Status
    app.put("/parcels/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const { status } = req.body;
      const filter = { _id: new ObjectId(id) }; // Remove the status condition
      const updateDoc = { $set: { status } };

      try {
        const result = await parcelCollection.updateOne(filter, updateDoc);

        if (result.matchedCount === 0) {
          return res.status(404).json({ message: "Parcel not found" });
        }

        res.status(200).json({ message: "Parcel status updated successfully" });
      } catch (error) {
        console.error("Error updating parcel status:", error);
        res.status(500).json({ message: "Failed to update parcel status" });
      }
    });

    // 4. Cancel a Parcel Booking
    // app.patch("/parcels/cancel/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const filter = { _id: new ObjectId(id), status: "pending" }; // Can only cancel if status is 'pending'
    //   const updateDoc = { $set: { status: "cancelled" } };
    //   const result = await parcelCollection.updateOne(filter, updateDoc);
    //   res.send(result);
    // });
    app.patch("/parcels/cancel/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      try {
        const filter = { _id: new ObjectId(id), status: "pending" }; // Can only cancel if status is 'pending'
        const updateDoc = { $set: { status: "cancelled" } };
        const result = await parcelCollection.updateOne(filter, updateDoc);

        if (result.matchedCount === 0) {
          return res
            .status(404)
            .json({ message: "Parcel not found or already cancelled" });
        }

        res
          .status(200)
          .json({ message: "Parcel booking cancelled successfully" });
      } catch (error) {
        console.error("Error cancelling parcel booking:", error);
        res.status(500).json({ message: "Failed to cancel parcel booking" });
      }
    });

    // 5. Filter Parcels by Status
    app.get("/parcels/status/:status", async (req, res) => {
      const email = req.decoded.email;
      const status = req.params.status;
      const result = await parcelCollection.find({ email, status }).toArray();
      res.send(result);
    });
    // 6. Update Booking Details
    app.patch("/parcels/update/:id", async (req, res) => {
      const id = req.params.id;
      const updates = req.body;
      const filter = { _id: new ObjectId(id), status: "pending" }; // Only allow updates if status is 'pending'
      const updateDoc = { $set: updates };
      const result = await parcelCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // 7. Add Review to Delivered Parcel
    app.post("/reviews", verifyToken, async (req, res) => {
      const review = req.body;
      try {
        const result = await reviewCollection.insertOne(review);
        res.json(result);
      } catch (error) {
        console.error("Error saving review:", error);
        res.status(500).send("Failed to save review");
      }
    });

    // payment intent
    app.post("/create-payment-intent", async (req, res) => {
      const { price } = req.body;
      const amount = parseInt(price * 100);
      console.log(amount, "amount inside the intent");

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });

      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });
    app.get("/payments/:email", verifyToken, async (req, res) => {
      const query = { email: req.params.email };
      if (req.params.email !== req.decoded.email) {
        return res.status(403).send({ message: "forbidden access" });
      }
      const result = await paymentCollection.find(query).toArray();
      res.send(result);
    });

    app.post("/payments", async (req, res) => {
      const payment = req.body;

      if (
        !payment.parcelIds ||
        !Array.isArray(payment.parcelIds) ||
        payment.parcelIds.some((id) => !ObjectId.isValid(id))
      ) {
        return res.status(400).send({ error: "Invalid parcel IDs" });
      }

      const session = client.startSession();

      try {
        session.startTransaction();

        const paymentResult = await paymentCollection.insertOne(payment, {
          session,
        });

        // Create the query for updating parcel status
        const query = {
          _id: {
            $in: payment.parcelIds.map((id) => new ObjectId(id)),
          },
          status: "pending", // Example status to check before deletion
        };

        const updateDoc = {
          $set: { status: "paid" }, // Example update to parcel status
        };

        const updateResult = await parcelCollection.updateMany(
          query,
          updateDoc,
          { session }
        );

        await session.commitTransaction();

        res.send({ paymentResult, updateResult });
      } catch (error) {
        await session.abortTransaction();
        console.error("Error processing payment:", error);
        res.status(500).send({ error: "Failed to process payment" });
      } finally {
        session.endSession();
      }
    });

    // stats or analytics
    app.get("/admin-stats", verifyToken, verifyAdmin, async (req, res) => {
      const users = await userCollection.estimatedDocumentCount();
      const menuItems = await menuCollection.estimatedDocumentCount();
      const orders = await paymentCollection.estimatedDocumentCount();

      // this is not the best way
      // const payments = await paymentCollection.find().toArray();
      // const revenue = payments.reduce((total, payment) => total + payment.price, 0);

      const result = await paymentCollection
        .aggregate([
          {
            $group: {
              _id: null,
              totalRevenue: {
                $sum: "$price",
              },
            },
          },
        ])
        .toArray();

      const revenue = result.length > 0 ? result[0].totalRevenue : 0;

      res.send({
        users,
        menuItems,
        orders,
        revenue,
      });
    });

    // order status
    /**
     * ----------------------------
     *    NON-Efficient Way
     * ------------------------------
     * 1. load all the payments
     * 2. for every menuItemIds (which is an array), go find the item from menu collection
     * 3. for every item in the menu collection that you found from a payment entry (document)
     */

    // using aggregate pipeline
    app.get("/order-stats", verifyToken, verifyAdmin, async (req, res) => {
      const result = await paymentCollection
        .aggregate([
          {
            $unwind: "$menuItemIds",
          },
          {
            $lookup: {
              from: "menu",
              localField: "menuItemIds",
              foreignField: "_id",
              as: "menuItems",
            },
          },
          {
            $unwind: "$menuItems",
          },
          {
            $group: {
              _id: "$menuItems.category",
              quantity: { $sum: 1 },
              revenue: { $sum: "$menuItems.price" },
            },
          },
          {
            $project: {
              _id: 0,
              category: "$_id",
              quantity: "$quantity",
              revenue: "$revenue",
            },
          },
        ])
        .toArray();

      res.send(result);
    });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.error(error);
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
