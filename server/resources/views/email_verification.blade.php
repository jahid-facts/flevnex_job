<!DOCTYPE>

<head>
    <meta http-equiv="Content-Type" charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email varification </title>
    <style>
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #4CAF50;
            color: white;
            text-align: center;
            text-decoration: none;
            font-size: 16px;
            border-radius: 5px;
            border: none;
            cursor: pointer;
        }

        .button:hover {
            background-color: #45a049;
        }

        .button:active {
            background-color: #3e8e41;
        }
    </style>
</head>

<body style="font-family: Helvetica, Arial, sans-serif; margin: 0px; padding: 0px; background-color: #ffffff;">
    <table role="presentation"
        style="width: 100%; border-collapse: collapse; border: 0px; border-spacing: 0px; font-family: Arial, Helvetica, sans-serif; background-color: rgb(239, 239, 239);">
        <tbody>
            <tr>
                <td align="center" style="padding: 1rem 2rem; vertical-align: top; width: 100%;">
                    <table role="presentation"
                        style="max-width: 700px; min-width: 600px; border-collapse: collapse; border: 0px; border-spacing: 0px; text-align: left;">
                        <tbody>
                            <tr>
                                <td style="padding: 40px 0px 0px;">
                                    <div style="padding: 20px; background-color: rgb(255, 255, 255);">
                                        <div style="color: rgb(0, 0, 0); text-align: center;">
                                            <img width="200px"
                                                src="https://ds9xi3hub5xxi.cloudfront.net/cdn/farfuture/otEn1mSO8Tk3mLVPFxYMCMwRn-qtie_ueonsviYMy0w/mtime:1608563955/sites/default/files/nodeicon/plugins_email-verification-plugin.png"
                                                alt="">
                                            <h1 style="margin: 1rem 0; color: #1f1f1f;">Verify your email address</h1>
                                            <p style="padding-bottom: 16px; color: #1f1f1f !important;">Please verify
                                                your email address by clicking this button</p>
                                            <hr>
                                            <p style="padding-bottom: 26px; padding-top:10px; text-align: center;">
                                                <a href="{{ $mailData['link'] }}" target="_blank"
                                                    style="color: #ffffff;" class="button">Verify your email</a>
                                            </p>
                                            <p style="padding-bottom: 16px;color: #1f1f1f;">If you didn’t request this,
                                                you can ignore this email.</p>
                                            <p style="padding-bottom: 16px;color: #1f1f1f;">
                                                Thanks<br>{{ $mailData['name'] }}</p>
                                        </div>
                                    </div>
                                    <div style="padding-top: 20px; color: rgb(153, 153, 153); text-align: center;">
                                        <p style="padding-bottom: 16px">Copyright</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
</body>

</html>
