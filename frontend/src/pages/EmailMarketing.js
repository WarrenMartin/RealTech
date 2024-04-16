
// // export default EmailMarketing;
// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import BASE_URL from '../apiConfig';

// // const EmailMarketing = () => {
// //     const [emails, setEmails] = useState('');
// //     const [message, setMessage] = useState('');

// //     const handleEmailChange = (e) => {
// //         setEmails(e.target.value);
// //     };

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();

// //         try {
// //             const response = await axios.post(`${BASE_URL}/sendEmails`, { recipients: emails.split(',') });

// //             if (response.status === 200) {
// //                 setMessage('Emails sent successfully!');
// //             } else {
// //                 setMessage('Failed to send emails');
// //             }
// //         } catch (error) {
// //             console.error('Error:', error);
// //             setMessage('Error sending emails');
// //         }
// //     };

// //     return (
// //         <div>
// //             <h1>Email Marketing Page</h1>
// //             <form onSubmit={handleSubmit}>
// //                 <label htmlFor="emails">Enter email addresses (separated by commas):</label>
// //                 <input
// //                     type="text"
// //                     id="emails"
// //                     value={emails}
// //                     onChange={handleEmailChange}
// //                     placeholder="e.g. email1@example.com, email2@example.com"
// //                     style={{ height: '70px' }} // Inline style to adjust height
// //                     required
// //                 />
// //                 <button type="submit">Send Emails</button>
// //             </form>
// //             <p>{message}</p>
// //         </div>
// //     );
// // };


// import React, { useState } from 'react';
// import axios from 'axios';
// import BASE_URL from '../apiConfig';

// const EmailMarketing = () => {
//     const [emails, setEmails] = useState('');
//     const [template, setTemplate] = useState('');
//     const [subject, setSubject] = useState('');
//     const [message, setMessage] = useState('');

//     const handleEmailChange = (e) => {
//         setEmails(e.target.value);
//     };

//     const handleTemplateChange = (e) => {
//         setTemplate(e.target.value);
//     };

//     const handleSubjectChange = (e) => {
//         setSubject(e.target.value);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await axios.post(`${BASE_URL}/sendEmails`, {
//                 recipients: emails.split(','),
//                 template: template,
//                 subject: subject // Include subject data in the request
//             });

//             if (response.status === 200) {
//                 setMessage('Emails sent successfully!');
//             } else {
//                 setMessage('Failed to send emails');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             setMessage('Error sending emails');
//         }
//     };

//     return (
//         <div>
//             <h1>Email Marketing Page</h1>
//             <form onSubmit={handleSubmit}>
//                 <label htmlFor="emails">Enter email addresses (separated by commas):</label>
//                 <input
//                     type="text"
//                     id="emails"
//                     value={emails}
//                     onChange={handleEmailChange}
//                     placeholder="e.g. email1@example.com, email2@example.com"
//                     style={{ height: '40px' }}
//                     required
//                 />
//                 <label htmlFor="subject">Enter Email Subject:</label>
//                 <input
//                     type="text"
//                     id="subject"
//                     value={subject}
//                     onChange={handleSubjectChange}
//                     placeholder="Enter subject for email"
//                     style={{ height: '40px' }}
//                     required
//                 />
//                 <label htmlFor="template">Enter HTML template:</label>
//                 <textarea
//                     id="template"
//                     value={template}
//                     onChange={handleTemplateChange}
//                     placeholder="Enter HTML code for email template"
//                     style={{ height: '200px', width: '100%', resize: 'vertical' }} // Adjust size as needed
//                     required
//                 />
//                 <button type="submit">Send Emails</button>
//             </form>
//             <p>{message}</p>
//         </div>
//     );
// };

// export default EmailMarketing;


import React, { useState,useEffect  } from 'react';
import axios from 'axios';
import BASE_URL from '../apiConfig';
import { useLocation } from 'react-router-dom'; // Import useLocation hook to access query parameters


const EmailMarketing = () => {
    const location = useLocation(); // Use useLocation hook to access the current location
    const [emails, setEmails] = useState('');
    const [template, setTemplate] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [reps, setReps] = useState([]);


    useEffect(() => {
        // Parse the query parameter from the URL
        const searchParams = new URLSearchParams(location.search);
        const email = searchParams.get('email');
        if (email) {
            setEmails(email); // Set the email value to the state
        }
    }, [location.search]);


    useEffect(() => {
        fetchRepsValues();
    }, []); // Fetch reps values when component mounts

    const fetchRepsValues = async () => {
        try {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjAyNjdmNmZkYWM0Y2Y5MjY5N2YyMzYiLCJpYXQiOjE3MTE4NjY1OTYsImV4cCI6MTcxMjEyNTc5Nn0.EiSDjkBpAa4g-uZO_ho6xohfCTBVrGXdXdxnVqcb3jc"; // Replace this with your actual authorization token
            const response = await fetch(`${BASE_URL}/api/workouts/reps/values`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json' // Adjust content type if needed
                }
                
            });
            if (!response.ok) {
                throw new Error('Failed to fetch reps values');
            }
            const data = await response.json();
            const transformedData = data.map(item => ({
                // Transform each item as needed
                id: item._id, // Assuming the ID is stored in the _id field
                name: item.name,
                value: item.value,
                // Add more transformations as needed
            }));
            setReps(transformedData);
            
        } catch (error) {
            console.error('Error fetching reps values:', error);
        }
    };

    const handleEmailChange = (e) => {
        setEmails(e.target.value);
    };

    

    

    const handleTemplateChange = (e) => {
        setTemplate(e.target.value);
    };

    const handleSubjectChange = (e) => {
        setSubject(e.target.value);
    };

    const handleTemplateClick = (templateHtml) => {
        setTemplate(templateHtml);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${BASE_URL}/sendEmails`, {
                recipients: emails.split(','),
                template: template,
                subject: subject // Include subject data in the request
            });

            if (response.status === 200) {
                setMessage('Emails sent successfully!');
            } else {
                setMessage('Failed to send emails');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error sending emails');
        }
    };

    // Define email templates
    const emailTemplates = [
        {
            name: ' UKG to 10th',
            html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Email Template 1</title>
                <style>
                    /* Add your CSS styles here */
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                        background-color: #f4f4f4;
                    }
                    .container {
                        max-width: 600px;
                        margin: 20px auto;
                        padding: 20px;
                        background-color: #fff;
                        border-radius: 20px;
                        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
                        border: 2px solid #4CAF50; /* Green border */
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    .header img {
                        max-width: 100%;
                        height: auto;
                        border-radius: 20px;
                    }
                    .content {
                        text-align: left;
                        padding: 0 20px;
                    }
                    .content h2 {
                        color: #333;
                        margin-bottom: 20px;
                        border-bottom: 2px solid #4CAF50; /* Green border */
                        padding-bottom: 10px;
                    }
                    .content p {
                        color: #666;
                        margin-bottom: 20px;
                        line-height: 1.6;
                    }
                    .content ul {
                        list-style-type: none;
                        padding: 0;
                        margin: 0;
                    }
                    .content ul li {
                        margin-bottom: 10px;
                    }
                    .cta-button {
                        display: inline-block;
                        background-color: #4CAF50;
                        color: white;
                        padding: 10px 20px;
                        text-align: center;
                        text-decoration: none;
                        border-radius: 5px;
                        margin-top: 20px;
                    }
                    .cta-button:hover {
                        background-color: #45a049;
                    }
                    .contact {
                        text-align: center;
                    }
                    .contact p {
                        color: #666;
                        margin-bottom: 20px;
                        line-height: 1.6;
                    }
                    .contact p:last-child {
                        margin-bottom: 0;
                    }
                </style>
            </head>
            <body>
            <div class="container">
                <div class="header">
                    <img src="https://mistribhejo.com/wp-content/uploads/2024/03/Tuition_Page.jpg" alt="Tuition Classes" style="max-width: 100%; height: auto;">
                </div>
                <div class="content">
                    <h2>Coaching Service</h2>
                    <p>Hey everyone! 🌟 Hope you're all doing well! 🌺 📚 Are you looking for top-notch coaching service to help you excel in your studies?</p>
                    <ul>
                        <li>👨‍🏫 Experienced and dedicated teachers.</li>
                        <li>📘 Tailored lessons to suit your learning style.</li>
                        <li>🏆 Proven track record of success.</li>
                        <li>💰 Affordable rates.</li>
                    </ul>
                    <a href="https://api.whatsapp.com/send/?phone=919158912473&text=Hi,%20I%20am%20Intrested%20in%20Tuition%20classes%20&type=phone_number&app_absent=0" class="cta-button">Call Now: +91 9158912473</a>
                </div>
            </div>
            </body>
            </html>
            
            `
        },
        {
            name: 'Template 2',
            html: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Email Template 2</title>
                    <style>
                        /* Add your CSS styles here */
                    </style>
                </head>
                <body>
                    <p>This is template 2</p>
                </body>
                </html>
            `
        },
        // Add more templates as needed
    ];

    return (
        <div>
            <h1>Email Marketing Page</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="emails">Enter email addresses (separated by commas):</label>
                <input
                    type="text"
                    id="emails"
                    value={emails}
                    onChange={handleEmailChange}
                    placeholder="e.g. email1@example.com, email2@example.com"
                    style={{ height: '40px' }}
                    required
                />
                <label htmlFor="subject">Enter Email Subject:</label>
                <input
                    type="text"
                    id="subject"
                    value={subject}
                    onChange={handleSubjectChange}
                    placeholder="Enter subject for email"
                    style={{ height: '40px' }}
                    required
                />
                <label htmlFor="template">Enter HTML template:</label>
                <textarea
                    id="template"
                    value={template}
                    onChange={handleTemplateChange}
                    placeholder="Enter HTML code for email template"
                    style={{ height: '200px', width: '100%', resize: 'vertical' }} // Adjust size as needed
                    required
                />
                <div>

                <button type="submit">Send Emails</button>
                
                    <label>Choose a template:</label>
                    {emailTemplates.map((template, index) => (
                        <button
                            key={index}
                            onClick={() => handleTemplateClick(template.html)}
                            style={{ margin: '5px', padding: '50px 30px', cursor: 'pointer', border: '1px solid #ccc', borderRadius: '5px' }} // Increased padding vertically to 50px
                        >
                            {template.name}
                        </button>
                    ))}
                </div>
              
            </form>
            <p>{message}</p>
        </div>
    );
};

export default EmailMarketing;
