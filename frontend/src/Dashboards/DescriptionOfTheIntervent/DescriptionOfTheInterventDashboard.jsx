import React from 'react';
import DescriptionOfTheInterventionLayout from './DescriptionOfTheInterventionLayout';
import DescriptionOfTheInterventionHistory from './Components/DescriptionOfTheInterventionHistory';

const DescriptionOfTheInterventionDashboard = () => {
    return (
        <DescriptionOfTheInterventionLayout>
            <div className="relative ">
            </div>
            <div>
                <DescriptionOfTheInterventionHistory />
            </div>
        </DescriptionOfTheInterventionLayout>
    );
}

export default DescriptionOfTheInterventionDashboard;
