import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';

const ActivityTracker = ({ candidateId, sqpId, qpId, currentQuestion, selectedAnswer, isAttempted }) => {
    const [activities, setActivities] = useState([]);
    const [lastViewTime, setLastViewTime] = useState(null);
    const [popupVisible, setPopupVisible] = useState(false); 
    const [popupMessage, setPopupMessage] = useState(''); 

    useEffect(() => {
        setLastViewTime(new Date().toISOString());
    }, [currentQuestion]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (activities.length > 0) {
                saveProgress();
            }
        }, 60000); // 1 minute interval

        return () => clearInterval(interval);
    }, [activities]);

    useEffect(() => {
        if (currentQuestion) {
            const currentTime = new Date().toISOString();
            const elapsedTime = lastViewTime ? Math.round((new Date(currentTime) - new Date(lastViewTime)) / 1000) : 0;

            const newActivity = {
                CANDIDATE_ID: candidateId,
                SQP_ID: sqpId,
                QP_ID: qpId,
                QUESTION_ID: currentQuestion.QUESTION_ID,
                SELECTED_ANSWER: parseInt(selectedAnswer, 10),
                LAST_VIEW_TIME: lastViewTime || currentTime,
                ELAPSED_TIME: elapsedTime,
                IS_ATTEMPED: isAttempted ? 1 : (selectedAnswer ? 1 : 0)
            };

            setActivities(prevActivities => [...prevActivities, newActivity]);
        }
    }, [currentQuestion, selectedAnswer, isAttempted]);

    const saveProgress = async () => {
        const apiUrl = `${import.meta.env.VITE_API_BASE_URL}:${import.meta.env.VITE_API_PORT}/paper/saveprogress`;
        const cookies = new Cookies();
        const token = cookies.get('token');
        
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': token
                },
                body: JSON.stringify({ list: activities })
            });

            const data = await response.json();
            
            if (data.message === "Progress saved successfully") {
                setPopupMessage(data.message); // Set the popup message from the response
                setPopupVisible(true); // Show popup on success
                setActivities([]); // Clear the activities list after successful save
                console.log(data.message);
                // Hide popup automatically after 5 seconds
                setTimeout(() => {
                    setPopupVisible(false);
                }, 5000);
            } else {
                console.error('Failed to save progress:', data.message);
            }
        } catch (error) {
            console.error('Error saving progress:', error);
        }
    };

    return (
        <>
            {popupVisible && (
                <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded">
                    {popupMessage}
                </div>
            )}
        </>
    );
};

export default ActivityTracker;
