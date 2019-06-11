////////////////////////////////////////////////////////////////////////////////
// SET LOAN IDs HERE
const loanIDs = ['1323015', '1530285', '1579699', '1616966'];
////////////////////////////////////////////////////////////////////////////////
// ADD ADDITIONAL FAQs HERE
const moreQuestions = null;
// const moreQuestions = [{ 'title': "This is the question", 'content': 'this is the answer' }];
////////////////////////////////////////////////////////////////////////////////
// SET THEORY VIDEOS HERE
const theoryVideos = [
    {
        service: 'youtube',
        video: 'https://www.youtube.com/embed/LznnUZDir94',
        name: 'Problem: The Missing Middle',
        duration: "4:51"
    },
    {
        service: 'youtube',
        video: 'https://www.youtube.com/embed/WyGlrWMuIqQ',
        name: 'Kiva DSE',
        duration: "1:47"
    },
    {
        service: 'youtube',
        video: 'https://www.youtube.com/embed/7KK0HRWkrAs',
        name: 'Introduction to Crowdvetting',
        duration: '8:41'
    },
    {
        service: 'youtube',
        video: 'https://www.youtube.com/embed/35r0xXXn_Sw',
        name: 'How does Crowdvet work',
        duration: '8:41'
    },
    {
        service: 'youtube',
        video: 'https://www.youtube.com/embed/NqtfMmJfm8g',
        name: 'Walkthrough',
        duration: '8:41'
    }
];
////////////////////////////////////////////////////////////////////////////////
const loadConfig = function () {
    window.loanIDs = loanIDs;
    window.theoryVideos = theoryVideos;
    if (moreQuestions) {
        window.moreQuestions = moreQuestions;
    } else {
        window.moreQuestions = [];
    }
    
}

export { loadConfig };