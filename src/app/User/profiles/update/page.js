import StepForm from '@/app/userForm/Stepform';
import { BreadcrumbSection } from '@/components/etc/Breadcrumb';
import React from 'react';

const Update = () => {
    return (
        <div>
            <div className='mx-10'>
            <BreadcrumbSection />
            </div>
            <div className='my-10 flex justify-center items-center bg-opacity-50'>

                <div className="w-full h-full max-w-4xl p-6 bg-white rounded-lg shadow-xl sm:mx-4 md:mx-8 lg:mx-0">
                    <StepForm />
                </div>
            </div>
        </div>
    );
};

export default Update;
