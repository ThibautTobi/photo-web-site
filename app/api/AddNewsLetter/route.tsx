import { connectToDB } from '@/utils/database';
//import Subscriber from '@/models/NewsLetter';
import { NextRequest, NextResponse } from 'next/server';
import NewsLetter from '@/models/newsLetter';

/********************************************************* ajout email a la base de donnée newsletter */
export async function POST(req :NextRequest) {

  await connectToDB();

  if (req.method === 'POST') {
    try {
      const  email  = req.body;
      const newsLetter = new NewsLetter({
        email,
    });

      return NextResponse.json({ success: true, newsLetter},{status : 201});
    } catch (error) {
    
     return NextResponse.json({ success: false, error },{status : 500})
    }
  } else {
    //res.status(405).json({ success: false, error: 'Method not allowed' });
    return NextResponse.json({ success: false, error :'Method not allowed'},{status : 405})
  }
}

/*



import { connectToDB } from '@/utils/database';
import Subscriber from '@/models/NewsLetter';
import { NextRequest, NextResponse } from 'next/server';

export default async function handler(req :NextRequest) {
  await connectToDB();

  if (req.method === 'POST') {
    try {
    //   const { email } = JSON.parse(req.body);
    const  email  = req.body;
    console.log(email)
      const subscriber = await Subscriber.create({ email });
      //res.status(201).json({ success: true, subscriber });
      return NextResponse.json({ success: true, subscriber},{status : 201});
    } catch (error) {
     // res.status(500).json({ success: false, error: error.message });
     return NextResponse.json({ success: false, error },{status : 201})
    }
  } else {
    //res.status(405).json({ success: false, error: 'Method not allowed' });
    return NextResponse.json({ success: false, error :'Method not allowed'},{status : 405})
  }
}





*/