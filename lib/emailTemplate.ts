export function getEmailContent(language: string, name: string): string {
  const logoUrl =
    "https://sanatanmahaparishad.org/images/logo.png";

  if (language === "en") {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="${logoUrl}" alt="Sanatan Mahaparishad Bharat Logo" style="max-width: 150px;">
          <h2 style="color: #9B0000; margin-top: 10px;">Sanatan Mahaparishad Bharat</h2>
        </div>
        <p>Dear ${name},</p>
        <p>A warm welcome to the Sanatan Mahaparishad Bharat family! We are delighted to have you join us.</p>
        <p>Moving forward, we will work together to promote the values of Sanatan Dharma and Indian culture. We look forward to your support and active participation.</p>
        <p>Best regards,</p>
        <p><strong>Sanatan Mahaparishad Bharat</strong></p>
        <p><strong>Note:</strong> This membership request form is acknowledged. However, your membership with Sanatan Mahaparishad will be permanent only after your payment is completed and you acknowledge us by sending the receipt.</p>
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #666;">
          <p>Office: Gyan Sarovar Vidyalaya, Near Gandhi Park, Mukhavat Yojana, Lucknow-226029</p>
          <p>Email: info@sanatanmahaparishad.org</p>
        </div>
      </div>
    `;
  } else {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="${logoUrl}" alt="सनातन महापरिषद भारत लोगो" style="max-width: 150px;">
          <h2 style="color: #9B0000; margin-top: 10px;">सनातन महापरिषद भारत</h2>
        </div>
        <p>प्रिय ${name},</p>
        <p>सनातन महापरिषद भारत परिवार में आपका हार्दिक स्वागत है! हमें खुशी है कि आप हमारे साथ जुड़े हैं।</p>
        <p>आने वाले समय में हम मिलकर सनातन धर्म और भारतीय संस्कृति के मूल्यों को बढ़ावा देने के लिए कार्य करेंगे। आपके समर्थन और सक्रिय भागीदारी की हम अपेक्षा करते हैं।</p>
        <p>शुभकामनाएं,</p>
        <p><strong>सनातन महापरिषद भारत</strong></p>
        <p><strong>ध्यान दें:</strong> यह सदस्यता अनुरोध प्रपत्र स्वीकार किया जाता है। हालाँकि, सनातन महापरिषद में आपकी सदस्यता स्थायी केवल तभी होगी जब आपका भुगतान पूरा हो जाएगा और आप रसीद भेजकर हमें सूचित करेंगे।</p>
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #666;">
          <p>कार्यालय: फ्लैट नंबर 503, टावर नंबर 16, ओमेक्स आर2, गोमती नगर एक्सटेंशन, पुलिस मुख्यालय के पास, लखनऊ, उत्तर प्रदेश, भारत 226002</p>
          <p>ईमेल: info@sanatanmahaparishad.org</p>
        </div>
      </div>
    `;
  }
}
