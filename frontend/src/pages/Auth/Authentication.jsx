import React from 'react';
import Login from './Login';
import { Celo } from 'iconsax-react';
import { Routes, Route } from 'react-router-dom';
import Register from './Register';
import ForgotPassword from './ForgotPassword';


const Authentication = () => {
    return (
        <div className="flex flex-col md:flex-row w-full h-screen items-center justify-center">
            <div
                className="w-full md:w-1/2 h-full bg-cover bg-center flex"
                style={{
                    backgroundImage:
                        'url(https://s3-alpha-sig.figma.com/img/3d0d/907a/8f35e95655ce5b4c6689ded52bd498ed?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eh2DZQyhFlA2~VSq8O2WQCjucSWquURJ0g140k1~6SMaCGxWMmMoXkF4NQRXke7KR6ohcWrjDfxEKTRqZJq~Ml2cQcL0bTRHGcyhVikmEyX8INvwanv5dV~1RI0XCs18YPdEWwfadu59OaJJj7kw-6o3pRq6AeJvfWBPROMW9K6AAC1uJJIZh0RtZLjrlcolrI6aW6X~iikGMD0Ow8jZ9I7eEo7hBCiTEDaS23ae14YJGQh7q6yd8BkgLs8iDEZqa~WGz7p1SMSiU5uLlg4hvzfVli-WDtdGTsJAT6GFojW1byIK2BDckziSJkGMY-kBb27xnR~437Jo2uZqbDhFzA__)',

                }}
            >
                <div className="w-full h-full flex flex-col justify-between pt-[52px] pb-[52px] pl-[68px] pr-[68px]" style={{ background: 'rgba(24, 24, 27, 0.5)' }}>
                    <span className="flex gap-6">
                        <Celo size="42" color="#FFFFFF" variant="Bulk" className="mt-[10px] mb-[10px]" />
                        <h1 className="text-white text-[42px] font-bold">Sirqu</h1>
                    </span>
                    <div className="text-white">
                        <h1 className="text-[24px] font-medium mb-[24px]">“Quick setup, user-friendly, and perfect for my café. Highly recommend for any small business!”</h1>
                        <h1>Daffa Fairuz - Madura Merchant Owner</h1>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-1/2 h-auto overflow-y-auto  scrollbar-hide max-h-screen">
                <Routes>
                    <Route path="*" element={<Login />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="forgot-password" element={<ForgotPassword />} />
                </Routes>
            </div>
        </div>
    );
};

export default Authentication;
