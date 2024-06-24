import React from 'react';
import FollowUpAndValidationLayout from './FollowUpAndValidationLayout';
import FollowUpAndValidationHistory from './Components/FollowUpAndValidationHistory';

const FollowUpAndValidationDashboard = () => {
    return (
        <FollowUpAndValidationLayout>
            <div className="relative ">
            </div>
            <div>
                <FollowUpAndValidationHistory />
            </div>
        </FollowUpAndValidationLayout>
    );
}

export default FollowUpAndValidationDashboard;
