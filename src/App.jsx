import React, { useState, useEffect, useMemo } from 'react';

// Data for the typology questions, extracted from the provided image
const questionsData = [
  {
    category: "Bodily Characteristics",
    questions: [
      {
        id: "height",
        question: "Height",
        options: [
          { text: "Shorter", type: "Wind" },
          { text: "Average height", type: "Fire" },
          { text: "Taller", type: "Earth/Water" },
        ],
      },
      {
        id: "weight",
        question: "Weight",
        options: [
          { text: "Underweight; easily loses and struggles to gain weight", type: "Wind" },
          { text: "Average weight; easily maintains weight", type: "Fire" },
          { text: "Overweight; struggles to lose and easily gains weight", type: "Earth/Water" },
        ],
      },
      {
        id: "physical-build",
        question: "Physical Build",
        options: [
          { text: "Small, slender, skinny, delicate", type: "Wind" },
          { text: "Medium build, muscular", type: "Fire" },
          { text: "Stout, heavy-set, big bodied, big limbs", type: "Earth/Water" },
        ],
      },
      {
        id: "posture",
        question: "Posture",
        options: [
          { text: "Stooped, hunched spine", type: "Wind" },
          { text: "Erect spine and muscular posture", type: "Fire" },
          { text: "Open-chested, arched spine, swayed back posture", type: "Earth/Water" },
        ],
      },
      {
        id: "joints",
        question: "Joints",
        options: [
          { text: "Protruding; crack easily when moving", type: "Wind" },
          { text: "Average; well-formed", type: "Fire" },
          { text: "Less prominent; well-hidden under skin, muscle, and fat", type: "Earth/Water" },
        ],
      },
      {
        id: "skin-complexion",
        question: "Skin and Complexion",
        options: [
          { text: "Darker or bluish complexion; dry, rough, flaky skin", type: "Wind" },
          { text: "Yellowish or reddish complexion; oily", type: "Fire" },
          { text: "Pale or light complexion; soft, smooth, plump, well-hydrated skin", type: "Earth/Water" },
        ],
      },
      {
        id: "hair",
        question: "Hair",
        options: [
          { text: "Dry, thin, rough", type: "Wind" },
          { text: "Oily, blond or reddish in color", type: "Fire" },
          { text: "Thick, luxurious, voluminous; well-hydrated; thick eyelashes", type: "Earth/Water" },
        ],
      },
      {
        id: "body-temperature",
        question: "Body Temperature",
        options: [
          { text: "Irregular; sensitive to cold, windy weather and temperature oscillations", type: "Wind" },
          { text: "Runs hot; sweats easily and a lot", type: "Fire" },
          { text: "Generally, consistently cold but insensitive to temperature changes", type: "Earth/Water" },
        ],
      },
      {
        id: "digestion-metabolism",
        question: "Digestion, Metabolism",
        options: [
          { text: "Inconsistent; sensitive digestion", type: "Wind" },
          { text: "Strong digestion and metabolism", type: "Fire" },
          { text: "Slow metabolism and sluggish digestion", type: "Earth/Water" },
        ],
      },
      {
        id: "appetite",
        question: "Appetite",
        options: [
          { text: "Irregular", type: "Wind" },
          { text: "Strong, consistent thirst and appetite", type: "Fire" },
          { text: "May not feel strong appetite but snacks habitually", type: "Earth/Water" },
        ],
      },
      {
        id: "favorite-tastes-foods",
        question: "Favorite Tastes and Foods",
        options: [
          { text: "Sweet, sour, salty, and bitter tastes", type: "Wind" },
          { text: "Sweet, bitter, astringent tastes", type: "Fire" },
          { text: "Hot, sour, astringent, and salty tastes", type: "Earth/Water" },
        ],
      },
      {
        id: "bowel-movements",
        question: "Bowel Movements",
        options: [
          { text: "Irregular; inconsistent; tendency toward constipation; minimal or inconsistent reaction to laxatives", type: "Wind" },
          { text: "Frequent; tendency toward diarrhea; quick, strong reaction to laxatives", type: "Fire" },
          { text: "Slow; consistent reaction to laxatives", type: "Earth/Water" },
        ],
      },
      {
        id: "common-physical-challenges",
        question: "Common Physical Challenges",
        options: [
          { text: "Pelvic, lower body problems; sensitivity to pain; nervous system; neuro-muscular and sensory issues", type: "Wind" },
          { text: "Mid-body problems; headaches; inflammatory, breakout", type: "Fire" },
          { text: "Above-the-neck problems; poor blood circulation; prone to metabolic problems", type: "Earth/Water" },
        ],
      },
    ],
  },
  {
    category: "Mental Characteristics",
    questions: [
      {
        id: "temperament",
        question: "Temperament",
        options: [
          { text: "Nervous; physically restless; and mentally active; sensitive and responsive; changeable and inconsistent; Imaginative; imaginative and creative; non-conformist and competitive; may bait others; enjoys socializing, laughing, and joking", type: "Wind" },
          { text: "Ambitious; courageous; enthusiastic; leadership qualities; quick-witted; easily annoyed; prone to jealousy", type: "Fire" },
          { text: "Relaxed, calm, gentle; dependent; stubborn and obsessive; consistent; patient, tolerant, and long-suffering; lethargic; laconic, slow and monotonous; considerate, resistant to change", type: "Earth/Water" },
        ],
      },
      {
        id: "emotions",
        question: "Emotions",
        options: [
          { text: "Emotionally sensitive, reactive, unstable, and unpredictable; prone to and forgive easily lonely, anxious, and afraid", type: "Wind" },
          { text: "Angry, hostile, jealous, impatient; proud; competitive; confident, egocentric; easily disgusted or indignant", type: "Fire" },
          { text: "Emotionally stable, nonreactive, UNstable, deep feelings of anger; confinement or sadness; slow to anger but slow to forgive; tendency towards depression", type: "Earth/Water" },
        ],
      },
      {
        id: "confidence",
        question: "Confidence",
        options: [
          { text: "Lack of self-confidence; unreliable", type: "Wind" },
          { text: "Very confident in own goals, knowledge, and personality", type: "Fire" },
          { text: "Consistent, stable confidence but more modest, less demonstrative", type: "Earth/Water" },
        ],
      },
      {
        id: "mindset",
        question: "Mindset",
        options: [
          { text: "Desirous, fearful", type: "Wind" },
          { text: "Focused on competition and business", type: "Fire" },
          { text: "Lazy, unbothered", type: "Earth/Water" },
        ],
      },
      {
        id: "intellect",
        question: "Intellect",
        options: [
          { text: "Agile, flexible; creative; selective intelligence; quick to learn, quick to forget; openness to novel ideas", type: "Wind" },
          { text: "Generally strong incentive intelligence; fast learners", type: "Fire" },
          { text: "Slow but steady learners; slow, deep thinkers", type: "Earth/Water" },
        ],
      },
      {
        id: "memory",
        question: "Memory",
        options: [
          { text: "Good short-term memory; short attention span", type: "Wind" },
          { text: "Good long-term and short-term memory; clear, focused attention", type: "Fire" },
          { text: "Good long-term memory", type: "Earth/Water" },
        ],
      },
      {
        id: "socializing",
        question: "Socializing",
        options: [
          { text: "Enjoys socializing; is balanced and soothed by socializing; highly sensitive to others and the environment", type: "Wind" },
          { text: "Enjoy communal athletic and competitive activities", type: "Fire" },
          { text: "Builds relationships slowly and steadily", type: "Earth/Water" },
        ],
      },
      {
        id: "common-mental-challenges",
        question: "Common Mental Challenges",
        options: [
          { text: "Anxiety, difficulty concentrating", type: "Wind" },
          { text: "Obsessiveness; anger management issues", type: "Fire" },
          { text: "Laziness, apathy; lack of mental clarity; confusion", type: "Earth/Water" },
        ],
      },
      {
        id: "speech",
        question: "Speech",
        options: [
          { text: "Talkative; changes the subject often and easily", type: "Wind" },
          { text: "Precise, direct communication; quick responses; repeated sentences or critiques that hit the mark", type: "Fire" },
          { text: "Less talkative; slower responses and longer pauses", type: "Earth/Water" },
        ],
      },
      {
        id: "sleep",
        question: "Sleep",
        options: [
          { text: "Light and interrupted; prone to insomnia; tendency to wake up before and around sunrise", type: "Wind" },
          // Corrected as per user feedback and image review
          { text: "Moderate amount of sleep; wakes up easily in the morning; tendency to wake up in hours around midnight", type: "Fire" },
          { text: "Deep, heavy sleep; falls asleep easily, difficulty waking up", type: "Earth/Water" },
        ],
      },
      {
        id: "dreams",
        question: "Dreams",
        options: [
          { text: "Prone to unpleasant dreams and nightmares; fragmented, changeable, distressful; restless; dreams of flying, moving, climbing", type: "Wind" },
          { text: "Bright, clear, vivid dreams; ego-focused or angry dreams; good dream recall", type: "Fire" },
          { text: "Simple, stable, calm, consistent dreams; extended dreams; otherwise, dreams might be hazy or minimal; less dream recall", type: "Earth/Water" },
        ],
      },
    ],
  },
];

// Component for a single question row with multiple checkboxes
const QuestionRow = ({ question, selections, onSelectionChange }) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center py-4 border-b border-gray-200">
      <div className="w-full md:w-1/4 mb-2 md:mb-0">
        <h3 className="font-semibold text-gray-800">{question.question}</h3>
      </div>
      <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {question.options.map((option, idx) => (
          <label
            key={idx}
            className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors duration-200 ease-in-out shadow-sm"
            htmlFor={`${question.id}-${option.type}-${idx}`}
          >
            <input
              type="checkbox"
              id={`${question.id}-${option.type}-${idx}`}
              className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500 mr-3"
              checked={selections[question.id]?.includes(option.type) || false}
              onChange={() => onSelectionChange(question.id, option.type)}
            />
            <span className="text-gray-700 text-sm flex-grow">
              <span className={`inline-block font-medium px-2 py-0.5 rounded-full text-xs mr-2
                ${option.type === "Wind" ? "bg-blue-100 text-blue-800" :
                 option.type === "Fire" ? "bg-red-100 text-red-800" :
                 "bg-green-100 text-green-800"}`}>
                {option.type}
              </span>
              {option.text}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

// Main App component
const App = () => {
  const [selections, setSelections] = useState({}); // Stores user selections
  const [results, setResults] = useState({ Wind: 0, Fire: 0, 'Earth/Water': 0 });
  const [showResults, setShowResults] = useState(false);

  // Calculate maximum possible points for each type
  const maxScores = useMemo(() => {
    const scores = { Wind: 0, Fire: 0, 'Earth/Water': 0 };
    questionsData.forEach(category => {
      category.questions.forEach(q => {
        // Each question can potentially contribute to all types if all options are selected
        scores.Wind += q.options.some(opt => opt.type === "Wind") ? 1 : 0;
        scores.Fire += q.options.some(opt => opt.type === "Fire") ? 1 : 0;
        scores['Earth/Water'] += q.options.some(opt => opt.type === "Earth/Water") ? 1 : 0;
      });
    });
    return scores;
  }, []);

  // Handler for when a checkbox is changed
  const handleSelectionChange = (questionId, type) => {
    setSelections(prevSelections => {
      const currentSelections = prevSelections[questionId] || [];
      if (currentSelections.includes(type)) {
        // If already selected, remove it
        return {
          ...prevSelections,
          [questionId]: currentSelections.filter(t => t !== type),
        };
      } else {
        // If not selected, add it
        return {
          ...prevSelections,
          [questionId]: [...currentSelections, type],
        };
      }
    });
  };

  // Calculate results when selections change or "Show Results" is clicked
  const calculateResults = () => {
    const scores = { Wind: 0, Fire: 0, 'Earth/Water': 0 };

    // Iterate through all questions to count points for selected types
    questionsData.forEach(category => {
      category.questions.forEach(q => {
        const selectedTypesForQuestion = selections[q.id] || [];
        selectedTypesForQuestion.forEach(selectedType => {
          scores[selectedType]++;
        });
      });
    });

    // Calculate percentages
    const calculatedPercentages = {};
    for (const type in scores) {
      if (maxScores[type] > 0) {
        calculatedPercentages[type] = ((scores[type] / maxScores[type]) * 100).toFixed(1);
      } else {
        calculatedPercentages[type] = 0; // Avoid division by zero
      }
    }
    setResults(calculatedPercentages);
    setShowResults(true); // Show results section
  };

  const resetQuiz = () => {
    setSelections({});
    setResults({ Wind: 0, Fire: 0, 'Earth/Water': 0 });
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 antialiased p-4 sm:p-8 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl p-6 md:p-10 w-full max-w-5xl mx-auto border border-gray-100">
        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-8 tracking-tight">
          Typology Assessment
        </h1>
        <p className="text-center text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
          Select all options that resonate with you for each characteristic. Your typology percentages will be calculated at the end.
        </p>

        {questionsData.map(categoryData => (
          <section key={categoryData.category} className="mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-blue-200 text-center md:text-left">
              {categoryData.category}
            </h2>
            <div className="space-y-4">
              {categoryData.questions.map(q => (
                <QuestionRow
                  key={q.id}
                  question={q}
                  selections={selections}
                  onSelectionChange={handleSelectionChange}
                />
              ))}
            </div>
          </section>
        ))}

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
          <button
            onClick={calculateResults}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold text-xl rounded-xl shadow-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Determine My Typology!
          </button>
          <button
            onClick={resetQuiz}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-gray-400 to-gray-600 text-white font-bold text-xl rounded-xl shadow-lg hover:from-gray-500 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-300"
          >
            Reset
          </button>
        </div>


        {showResults && (
          <div className="mt-16 bg-blue-50 p-6 rounded-xl shadow-inner border border-blue-200">
            <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">Your Typology Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(results).map(([type, percentage]) => (
                <div key={type} className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md border border-blue-100">
                  <div className={`text-5xl font-extrabold mb-3
                    ${type === "Wind" ? "text-blue-600" :
                     type === "Fire" ? "text-red-600" :
                     "text-green-600"}`}>
                    {percentage}%
                  </div>
                  <h3 className={`text-xl font-semibold mb-2
                    ${type === "Wind" ? "text-blue-800" :
                     type === "Fire" ? "text-red-800" :
                     "text-green-800"}`}>
                    {type}
                  </h3>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full
                        ${type === "Wind" ? "bg-blue-500" :
                         type === "Fire" ? "bg-red-500" :
                         "bg-green-500"}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-700 mt-8 text-sm">
              Note: Percentages indicate your alignment with each type based on your selections. You can select multiple options per row.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
