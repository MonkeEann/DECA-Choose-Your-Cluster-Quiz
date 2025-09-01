//This is a commment
const questions = [
    {
        question: "What kind of challenge excites you the most?",
        answers: [
            { text: "Analyzing numbers and trends", points: {Finance: 2}},
            { text: "Designing creative campaigns or ads", points: {Marketing: 2}},
            { text: "Leading a team to success", points: {BusinessAdmin: 2}},
            { text: "Starting something brand new", points: {Entrepreneurship: 2}},
            { text: "Planning an event or trip people will love", points: {Hospitality: 2}},
        ]
    },
    {
        question: "Which school subject do you enjoy the most?",
        answers: [
            { text: "Math or economics", points: {Finance: 2}},
            { text: "Art or Media (Creative Classes)", points: {Marketing: 2}},
            { text: "Business studies or leadership classes", points: {BusinessAdmin: 2}},
            { text: "STEM + business (like inventing or innovating)", points: {Entrepreneurship: 2}},
            { text: "Culinary, geography, or travel", points: {Hospitality: 2}},
        ]
    },
    {
        question: "How do you like solving problems?",
        answers: [
            { text: "By analyzing data step by step", points: {Finance: 2}},
            { text: "By brainstorming creative ideas", points: {Marketing: 2}},
            { text: "By organizing people and delegating tasks", points: {BusinessAdmin: 2}},
            { text: "By inventing unique solutions", points: {Entrepreneurship: 2}},
            { text: "By focusing on people’s needs and experiences", points: {Hospitality: 2}},
        ]
    },
    {
        question: "If you were in charge of a group project, what role would you take?",
        answers: [
            { text: "Budget manager", points: {Finance: 2}},
            { text: "Branding / advertising", points: {Marketing: 2}},
            { text: "Project organizer", points: {BusinessAdmin: 2}},
            { text: "Innovator with the big idea", points: {Entrepreneurship: 2}},
            { text: "Coordinator making sure everyone’s happy", points: {Hospitality: 2}},
        ]
    },
    {
        question: "What motivates you most in a career?",
        answers: [
            { text: "Financial stability and precision", points: {Finance: 2}},
            { text: "Creativity and influence", points: {Marketing: 2}},
            { text: "Leadership and structure", points: {BusinessAdmin: 2}},
            { text: "Freedom and innovation", points: {Entrepreneurship: 2}},
            { text: "Service and people experiences", points: {Hospitality: 2}},
        ]
    },
    {
        question: "How do you feel about risk?",
        answers: [
            { text: "I like safe, predictable outcomes", points: {Finance: 2}},
            { text: "I enjoy experimenting but with structure", points: {Marketing: 2, Entrepreneurship: 1}},
            { text: "I balance risk by making solid plans", points: {BusinessAdmin: 2}},
            { text: "I thrive on risk and uncertainty", points: {Entrepreneurship: 2}},
            { text: "I’ll take calculated risks if it makes people happy", points: {Hospitality: 2}},
        ]
    },
    {
        question: "Which career sounds most appealing to you?",
        answers: [
            { text: "Investment banker or financial analyst", points: {Finance: 2}},
            { text: "Marketing director or brand manager", points: {Marketing: 2}},
            { text: "CEO or operations manager", points: {BusinessAdmin: 2}},
            { text: "Startup founder or innovator", points: {Entrepreneurship: 2}},
            { text: "Hotel manager or event planner", points: {Hospitality: 2}},
        ]
    },
    {
        question: "Which of these statements best describes you?",
        answers: [
            { text: "I’m detail-oriented and love working with numbers", points: {Finance: 2}},
            { text: "I’m persuasive and enjoy influencing others", points: {Marketing: 2}},
            { text: "I’m organized and like managing people", points: {BusinessAdmin: 2}},
            { text: "I’m creative and willing to take risks", points: {Entrepreneurship: 2}},
            { text: "I’m friendly and enjoy helping people have great experiences", points: {Hospitality: 2}},
        ]
    },
    {
        question: "What kind of career project would you enjoy most?",
        answers: [
            { text: "Analyzing a company’s finances and creating a report", points: {Finance: 2}},
            { text: "Designing a marketing plan or ad campaign", points: {Marketing: 2}},
            { text: "Leading a team to improve operations", points: {BusinessAdmin: 2}},
            { text: "Launching a new business or product", points: {Entrepreneurship: 2}},
            { text: "Planning an event, hotel experience, or travel itinerary", points: {Hospitality: 2}},
        ]
    },
    {
        question: "Which type of class project do you enjoy most?",
        answers: [
            { text: "Solving math problems, analyzing data, or working with numbers", points: {Finance: 2}},
            { text: "Creating posters, videos, or presentations to persuade others", points: {Marketing: 2}},
            { text: "Leading a group, organizing tasks, or coordinating schedules", points: {BusinessAdmin: 2}},
            { text: "Designing a new product, inventing something, or proposing a new idea", points: {Entrepreneurship: 2}},
            { text: "Planning events, trips, or experiences for others", points: {Hospitality: 2}},
        ]
    }
];

const answerButtons = [
    document.getElementById('answer1'),
    document.getElementById('answer2'),
    document.getElementById('answer3'),
    document.getElementById('answer4'),
    document.getElementById('answer5')
];

const clusterScores = {
    Finance: 0,
    Marketing: 0,
    BusinessAdmin: 0,
    Entrepreneurship: 0,
    Hospitality: 0
};
const questionElement = document.getElementById('question');
const progressBar = document.getElementById('progressBar');

function updateProgressBar(index) {
    const percent = ((index + 1) / questions.length) * 100;
    progressBar.style.width = percent + '%';
}

let currentQuestionIndex = 0;

function showQuestion(index) {
    const q = questions[index];
    questionElement.textContent = q.question;

    updateProgressBar(index);

    answerButtons.forEach((btn, i) => {
        const answer = q.answers[i];
        btn.textContent = answer.text;

        btn.onclick = null; // Clear previous onclick to avoid stacking

        btn.onclick = () => {

            for (const cluster in answer.points) {
                clusterScores[cluster] += answer.points[cluster];
            }

            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion(currentQuestionIndex); // updates header
            } else {
                endQuiz(); // resets to first question
            }
            
        };
        console.log(clusterScores);

    });
}

function endQuiz() {
    let highestCluster = null;
    let highestScore = -1;

    for (const cluster in clusterScores){
        if (clusterScores[cluster] > highestScore){
            highestScore = clusterScores[cluster];
            highestCluster = cluster;
        }
    }

    let totalScore = 0;
    for (const cluster in clusterScores) {
        totalScore += clusterScores[cluster];
    }

    let scoreText = `Score Breakdown:\n`;
    for (const cluster in clusterScores) {
        scorePercentages = ((clusterScores[cluster] / totalScore) * 100).toFixed(1);
        scoreText += `${cluster}: ${scorePercentages}%\n`;
    }

    questionElement.textContent = `Your cluster is: ${highestCluster}!`;
    answerButtons.forEach(btn => btn.style.display = 'none');

    const scoreBreakdown = document.createElement('div');
    scoreBreakdown.className = 'scoreBreakdown';
    scoreBreakdown.style.display = 'block';

    document.getElementById('answers').appendChild(scoreBreakdown);

    scoreBreakdown.textContent = scoreText;

    let restartBtn = document.createElement('button');
    restartBtn.textContent = "Restart Quiz";
    restartBtn.className = 'answerButtons'; // re-use same styling
    restartBtn.style.display = 'block';
    restartBtn.style.margin = '1em auto';

    // Add click event to reset quiz
    restartBtn.onclick = () => {
        currentQuestionIndex = 0;
        for (const cluster in clusterScores) clusterScores[cluster] = 0; // reset scores
        scoreBreakdown.remove();
        restartBtn.remove();
        answerButtons.forEach(btn => btn.style.display = 'flex');
        showQuestion(currentQuestionIndex);
    };

    document.body.appendChild(restartBtn);
}

showQuestion(currentQuestionIndex);

