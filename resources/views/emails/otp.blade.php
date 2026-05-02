{{-- resources/views/emails/otp.blade.php --}}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Verification Code - {{ config('app.name') }}</title>
</head>
<body style="background-color: #f5f5f5; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                
                {{-- Main Container --}}
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 480px; background-color: #ffffff; border-radius: 8px; border: 1px solid #e5e7eb;">
                    
                    {{-- Header --}}
                    <tr>
                        <td style="padding: 40px 40px 32px 40px; text-align: center;">
                            <h1 style="color: #111827; font-size: 22px; font-weight: 600; margin: 0 0 8px 0; letter-spacing: -0.3px;">
                                Verification Code
                            </h1>
                            <p style="color: #6b7280; font-size: 15px; line-height: 1.6; margin: 0;">
                                Use this code to continue
                            </p>
                        </td>
                    </tr>

                    {{-- OTP Display --}}
                    <tr>
                        <td style="padding: 0 40px 32px 40px;">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="center" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px;">
                                        <span style="font-size: 36px; font-weight: 700; letter-spacing: 16px; color: #111827; font-family: 'SF Mono', 'Courier New', Courier, monospace;">
                                            {{ $otp }}
                                        </span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    {{-- Expiry Notice --}}
                    <tr>
                        <td style="padding: 0 40px 32px 40px; text-align: center;">
                            <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                                <tr>
                                    <td style="color: #6b7280; font-size: 13px; line-height: 1.5;">
                                        
                                        @if(isset($time))
                                            <br><span style="color: #9ca3af;">Expires on  {{ $time }}</span>
                                        @endif
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    {{-- Security Note --}}
                    <tr>
                        <td style="padding: 0 40px 32px 40px;">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px;">
                                <tr>
                                    <td style="padding: 16px;">
                                        <p style=" font-size: 13px; line-height: 1.6; margin: 0;">
                                            <strong style="color: #374151;"> ⚠️ Security tip:</strong> 
                                            Never share this code with anyone. Our team will never ask for it.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    {{-- Footer --}}
                    <tr>
                        <td style="padding: 0 40px 32px 40px; border-top: 1px solid #e5e7eb;">
                            <p style="color: #9ca3af; font-size: 13px; line-height: 1.6; margin: 24px 0 0 0; text-align: center;">
                                If you didn't request this code, you can safely ignore this email.
                            </p>
                            <p style="color: #9ca3af; font-size: 12px; line-height: 1.6; margin: 12px 0 0 0; text-align: center;">
                                &copy; {{ date('Y') }} {{ config('app.name') }}
                            </p>
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>
</html>