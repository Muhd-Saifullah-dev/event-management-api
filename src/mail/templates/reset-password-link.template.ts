export const resetPasswordTemplate = (
  resetUrl: string,
  name?: string,
): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Reset Your Password</title>
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
                      Secure account recovery
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
                      Reset your password
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
                      We received a request to reset the password for your
                      YourApp account. Click the button below to create a new
                      password.
                    </p>

                    <!-- Reset Button -->
                    <table
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                      border="0"
                    >
                      <tr>
                        <td align="center">
                          <a
                            href="${resetUrl}"
                            style="
                              display: inline-block;
                              background-color: #6366f1;
                              color: #ffffff;
                              text-decoration: none;
                              font-size: 15px;
                              font-weight: 700;
                              padding: 14px 28px;
                              border-radius: 10px;
                            "
                          >
                            Reset Password
                          </a>
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
                      This link will expire in <strong>10 minutes</strong>.
                    </p>

                    <!-- Security Notice -->
                    <div
                      style="
                        background-color: #f8fafc;
                        border: 1px solid #e2e8f0;
                        border-radius: 10px;
                        padding: 14px 16px;
                        margin-top: 24px;
                      "
                    >
                      <p
                        style="
                          margin: 0;
                          font-size: 13px;
                          line-height: 1.6;
                          color: #64748b;
                        "
                      >
                        <strong style="color: #475569;">
                          Security reminder:
                        </strong>
                        If you didn't request a password reset, you can safely
                        ignore this email.
                      </p>
                    </div>

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
                      If the button above doesn't work, copy and paste the
                      following link into your browser:
                    </p>

                    <p
                      style="
                        margin: 10px 0 0;
                        font-size: 12px;
                        line-height: 1.5;
                        word-break: break-all;
                      "
                    >
                      <a
                        href="${resetUrl}"
                        style="
                          color: #6366f1;
                          text-decoration: none;
                        "
                      >
                        ${resetUrl}
                      </a>
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
