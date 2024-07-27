import React from 'react';
import { MathJaxContext, MathJax } from 'better-react-mathjax';
import { Button, Radio, Typography } from '@mui/material';

const Questions = ({
    dataQuestions,
    questionChoices,
    questionIndex,
    selectedOptions,
    handleOptionChange,
    handleReset,
    handleBackClick,
    handleNextClick,
    handleReviewClick
}) => {
    return (
        <MathJaxContext>
            <div className="flex-[3] w-full h-[100%] overflow-auto">
                <Typography variant="h5" className='ml-4'>
                    Question No: {questionIndex + 1}
                </Typography>
                <MathJax>
                    <Typography className='ml-4 mr-4 mb-4'>
                        {dataQuestions && dataQuestions[questionIndex]?.QUESTION_TEXT}
                    </Typography>
                </MathJax>
                {questionChoices && questionChoices.map((choice, index) => {
                    const choiceId = `choice-${index}`;
                    return (
                        <label key={index} htmlFor={choiceId} className="flex items-center cursor-pointer mb-2">
                            <Radio
                                name="options"
                                id={choiceId}
                                checked={selectedOptions[questionIndex] === choiceId}
                                onChange={handleOptionChange}
                                value={choiceId}
                            />
                            <Typography className='ml-2'>
                                {choice.ANS_CHOICE_TEXT}
                            </Typography>
                        </label>
                    );
                })}
                <div className='flex flex-col justify-start items-start gap-4 m-4'>
                    <div className='flex justify-around items-start w-full'>
                        <Button
                            variant="contained"
                            onClick={handleReset}
                            disabled={!selectedOptions[questionIndex]}
                        >
                            Reset
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleBackClick}
                            disabled={questionIndex <= 0}
                        >
                            Back
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleNextClick}
                            disabled={dataQuestions && questionIndex >= dataQuestions.length - 1}
                        >
                            Next
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleReviewClick}
                        >
                            Review
                        </Button>
                    </div>
                </div>
            </div>
        </MathJaxContext>
    );
};

export default Questions;
