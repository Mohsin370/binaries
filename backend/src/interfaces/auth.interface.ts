interface tokenData {
    email: string;
    id: string;
    role_id: number;
  }
  
  interface mailOptions {
    from: string | undefined;
    to: string;
    subject: string;
    html: string;
  }

  export {
    tokenData,
    mailOptions
  }