const mongoose = require("mongoose");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const courseModel = require("../models/Course.model");

const checkout = async (req, res) => {
  const { cart_items } = req.body;
  const courseIds = cart_items.map((id) => new mongoose.Types.ObjectId(id));
  const query = { _id: { $in: courseIds } };

  try {
    const purchasingCourses = await courseModel.find(query);
    if (purchasingCourses.length > 0) {
      // Check if any courses are found
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: purchasingCourses.map((course) => {
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: course.courseName,
              },
              unit_amount: course.coursePrice * 100,
            },
            quantity: 1,
          };
        }),
        success_url: `${process.env.SERVER_URL}/student/dashboard/payment-success`,
        cancel_url: `${process.env.SERVER_URL}/student/dashboard/payment-unsuccess`,
      });
      if (session) {
        return res.status(200).json({ link: session.url });
      }
    } else {
      return res.status(404).json({ message: "No courses found!" });
    }
  } catch (error) {
    console.error("Error during checkout:", error);
    return res
      .status(500)
      .json({ message: "An error occurred during checkout!" });
  }
};

module.exports = { checkout };
