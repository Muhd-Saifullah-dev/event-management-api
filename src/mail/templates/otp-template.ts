export const sendOtpTemplate = (otp: string, name?: string): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Your OTP Code</title>
      </head>

      <body
        style="
          margin: 0;
          padding: 0;
          background-color: #f8fafc;
          font-family: Arial, Helvetica, sans-serif;
          color: #0f172a;
        "
      >
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="background-color: #f8fafc; padding: 40px 20px;"
        >
          <tr>
            <td align="center">

              <!-- Main Card -->
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="
                  max-width: 520px;
                  background-color: #ffffff;
                  border: 1px solid #e2e8f0;
                  border-radius: 16px;
                  overflow: hidden;
                "
              >

                <!-- Header -->
                <tr>
                  <td
                    align="center"
                    style="
                      background-color: #6366f1;
                      padding: 28px 20px;
                    "
                  >
                    <h1
                      style="
                        margin: 0;
                        color: #ffffff;
                        font-size: 24px;
                        font-weight: 700;
                      "
                    >
                      YourApp
                    </h1>

                    <p
                      style="
                        margin: 8px 0 0;
                        color: #e0e7ff;
                        font-size: 14px;
                      "
                    >
                      Secure account verification
                    </p>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 36px 32px;">

                    <h2
                      style="
                        margin: 0 0 12px;
                        font-size: 22px;
                        font-weight: 700;
                        color: #0f172a;
                      "
                    >
                      Verify your email
                    </h2>

                    <p
                      style="
                        margin: 0 0 20px;
                        font-size: 15px;
                        line-height: 1.6;
                        color: #64748b;
                      "
                    >
                      Hi ${name || 'there'},
                    </p>

                    <p
                      style="
                        margin: 0 0 24px;
                        font-size: 15px;
                        line-height: 1.6;
                        color: #64748b;
                      "
                    >
                      Use the verification code below to continue.
                      This code will expire in <strong>1 minutes</strong>.
                    </p>

                    <!-- OTP Box -->
                    <table
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                      border="0"
                    >
                      <tr>
                        <td align="center">
                          <div
                            style="
                              display: inline-block;
                              background-color: #eef2ff;
                              border: 1px solid #c7d2fe;
                              border-radius: 12px;
                              padding: 18px 32px;
                            "
                          >
                            <span
                              style="
                                color: #4f46e5;
                                font-size: 32px;
                                font-weight: 700;
                                letter-spacing: 8px;
                              "
                            >
                              ${otp}
                            </span>
                          </div>
                        </td>
                      </tr>
                    </table>

                    <p
                      style="
                        margin: 24px 0 0;
                        font-size: 13px;
                        line-height: 1.5;
                        text-align: center;
                        color: #94a3b8;
                      "
                    >
                      Please do not share this code with anyone.
                    </p>

                    <!-- Divider -->
                    <div
                      style="
                        height: 1px;
                        background-color: #e2e8f0;
                        margin: 30px 0;
                      "
                    ></div>

                    <p
                      style="
                        margin: 0;
                        font-size: 13px;
                        line-height: 1.6;
                        color: #94a3b8;
                      "
                    >
                      If you didn't request this verification code, you can
                      safely ignore this email. Your account remains secure.
                    </p>

                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td
                    align="center"
                    style="
                      background-color: #f8fafc;
                      padding: 20px;
                      border-top: 1px solid #e2e8f0;
                    "
                  >
                    <p
                      style="
                        margin: 0;
                        font-size: 12px;
                        color: #94a3b8;
                      "
                    >
                      © ${new Date().getFullYear()} YourApp. All rights reserved.
                    </p>
                  </td>
                </tr>

              </table>

            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
};
