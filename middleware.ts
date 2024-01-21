import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export const config = {
    matcher : [
        '/((?!auth|account|favicon.ico|_next).*)'
    ]
}

export async function middleware(req : NextRequest) : Promise<NextResponse> {

    const res : NextResponse = NextResponse.next();
    const supabase = createMiddlewareClient({req, res});
    const {data} = await supabase.auth.getSession();

    if (!data.session && !req.nextUrl.pathname.startsWith('/auth') && !req.nextUrl.pathname.startsWith('/account')) {

        const loginUrl = req.nextUrl.clone();

        loginUrl.pathname = "/auth/login";

        return NextResponse.redirect(loginUrl);

    
    } else {

        return res;
    
    }


}