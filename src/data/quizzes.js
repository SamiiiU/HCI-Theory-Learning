import { topics } from './topics';

export const trueFalseQuestions = topics.map((topic, index) => ({
  id: `tf-${topic.id}`,
  topicId: topic.id,
  prompt:
    index % 2 === 0
      ? `${topic.title} is relevant to HCI design and evaluation.`
      : `${topic.title} should be considered only after deployment and never during design.`,
  answer: index % 2 === 0,
  explanation:
    index % 2 === 0
      ? `${topic.title} helps designers reason about users, interfaces, graphics, or interaction behavior.`
      : `${topic.title} should influence design decisions before release, not only after deployment.`,
}));

export const shortAnswerQuestions = topics.map((topic) => ({
  id: `short-${topic.id}`,
  topicId: topic.id,
  prompt: topic.practiceQuestion,
  modelAnswer: topic.examAnswer,
}));

export function buildQuizPool({ category = 'All', random = false, limit = 12 } = {}) {
  const filtered = category === 'All' ? topics : topics.filter((topic) => topic.category === category);
  const mcq = filtered.map((topic) => ({
    id: `mcq-${topic.id}`,
    type: 'mcq',
    topicId: topic.id,
    prompt: topic.quiz.question,
    options: topic.quiz.options,
    answer: topic.quiz.answer,
    explanation: topic.examAnswer,
  }));
  const tf = filtered.map((topic) => {
    const item = trueFalseQuestions.find((question) => question.topicId === topic.id);
    return {
      id: item.id,
      type: 'truefalse',
      topicId: topic.id,
      prompt: item.prompt,
      options: ['True', 'False'],
      answer: item.answer ? 'True' : 'False',
      explanation: item.explanation,
    };
  });
  const short = filtered.map((topic) => ({
    id: `quiz-short-${topic.id}`,
    type: 'short',
    topicId: topic.id,
    prompt: topic.practiceQuestion,
    answer: 'Reveal model answer',
    explanation: topic.examAnswer,
  }));

  const pool = [...mcq, ...tf, ...short];
  if (!random) return pool.slice(0, limit);

  return [...pool].sort(() => Math.random() - 0.5).slice(0, limit);
}
