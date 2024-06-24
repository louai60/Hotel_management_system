import React from 'react';
import CleaningDetailLayout from './CleaningDetailLayout';
import CleaningDetailHistory from './Components/CleaningDetailHistory';

const CleaningDetailDashboard = () => {
    return (
        <CleaningDetailLayout>
            <div className="relative ">
            </div>
            <div>
                <CleaningDetailHistory />
            </div>
        </CleaningDetailLayout>
    );
}

export default CleaningDetailDashboard;
