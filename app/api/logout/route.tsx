import { NextRequest, NextResponse } from 'next/server';

export function POST(req: NextRequest, res: NextResponse) {
    if (req.method === 'POST') {

        const response = NextResponse.json({ message: 'succès du Logout', redirectTo: '/'  });

        response.cookies.delete('authToken'),
        response.cookies.delete('userRole')
        
        return response
    } else {
        return NextResponse.json("erreur suppresion cookies.", { status: 400 });
    }
}