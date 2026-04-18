// import { NextRequest, NextResponse } from 'next/server';
// const Razorpay = require('razorpay');

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// export async function POST(request: NextRequest) {
//   try {
//     const { amount, currency = 'INR', receipt } = await request.json();

//     if (!amount) {
//       return NextResponse.json(
//         { error: 'Amount is required' },
//         { status: 400 }
//       );
//     }

//     const options = {
//       amount: Math.round(amount * 100), // Razorpay expects amount in paise
//       currency,
//       receipt: receipt || `receipt_${Date.now()}`,
//       payment_capture: 1, // Auto capture payment
//     };

//     const order = await razorpay.orders.create(options);

//     return NextResponse.json({
//       id: order.id,
//       currency: order.currency,
//       amount: order.amount,
//     });
//   } catch (error) {
//     console.error('Razorpay order error:', error);
//     return NextResponse.json(
//       { error: 'Failed to create order' },
//       { status: 500 }
//     );
//   }
// }










import { NextRequest, NextResponse } from 'next/server';
const Razorpay = require('razorpay');

export async function POST(request: NextRequest) {
  try {
    // ✅ Create inside function
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    // ✅ Safety check
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        { error: 'Razorpay keys missing' },
        { status: 500 }
      );
    }

    const { amount, currency = 'INR', receipt } = await request.json();

    if (!amount) {
      return NextResponse.json(
        { error: 'Amount is required' },
        { status: 400 }
      );
    }

    const options = {
      amount: Math.round(amount * 100),
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      id: order.id,
      currency: order.currency,
      amount: order.amount,
    });

  } catch (error) {
    console.error('Razorpay order error:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}