import React, { useState } from 'react';
import { QUIZ_QUESTIONS, MENU_ITEMS } from '../data';
import { MenuItem } from '../types';
import { Sparkles, RefreshCw, CheckCircle, Coffee, Heart } from 'lucide-react';

interface WellnessMatchaQuizProps {
  onAddToCart: (item: MenuItem, quantity: number, selections: { [key: string]: { name: string; price: number } }) => void;
  openNotification: (msg: string) => void;
}

export default function WellnessMatchaQuiz({ onAddToCart, openNotification }: WellnessMatchaQuizProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<{ [questionId: string]: string }>({});
  const [recommendation, setRecommendation] = useState<MenuItem | null>(null);

  const handleOptionSelect = (questionId: string, value: string, tagMatch: string) => {
    const updatedAnswers = { ...answers, [questionId]: value };
    setAnswers(updatedAnswers);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Calculate Recommendation based on answers and tag Matches
      // Gather all selected tag matches
      const selectedTags = QUIZ_QUESTIONS.map(q => {
        const selectedVal = updatedAnswers[q.id];
        const option = q.options.find(opt => opt.value === selectedVal);
        return option ? option.tagMatch.toLowerCase() : '';
      }).filter(Boolean);

      // Find best menu item containing most matches or default to Ceremonial Matcha
      let bestItem = MENU_ITEMS.find(item => item.id === 'ceremonial-matcha') || MENU_ITEMS[0];
      let maxScore = -1;

      MENU_ITEMS.forEach(item => {
        let score = 0;
        selectedTags.forEach(tag => {
          if (
            item.name.toLowerCase().includes(tag) ||
            item.description.toLowerCase().includes(tag) ||
            item.tags.some(t => t.toLowerCase().includes(tag))
          ) {
            score++;
          }
        });
        if (score > maxScore) {
          maxScore = score;
          bestItem = item;
        }
      });

      setRecommendation(bestItem);
      setCurrentStep(prev => prev + 1);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setRecommendation(null);
  };

  const handleAddRecommended = () => {
    if (!recommendation) return;
    
    // Auto populate default selections if any
    const defaultSelections: { [key: string]: { name: string; price: number } } = {};
    if (recommendation.customizations) {
      recommendation.customizations.forEach(cust => {
        if (cust.options && cust.options.length > 0) {
          defaultSelections[cust.title] = cust.options[0];
        }
      });
    }

    onAddToCart(recommendation, 1, defaultSelections);
    openNotification(`✨ ${recommendation.name} added to your slow cart!`);
  };

  return (
    <div className="bg-[#f2edea]/80 border border-[#ccc6bb]/40 rounded-3xl p-6 md:p-8 carved-inset plaster-texture max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Heart className="w-5 h-5 text-brand-matcha" />
        <span className="font-sans text-xs tracking-widest text-brand-matcha font-semibold uppercase">
          SLOW LIVING RECOMMENDER
        </span>
      </div>

      {currentStep < QUIZ_QUESTIONS.length ? (
        <div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs text-brand-outline font-mono">
              Step {currentStep + 1} of {QUIZ_QUESTIONS.length}
            </span>
            <div className="flex gap-1">
              {QUIZ_QUESTIONS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 w-6 rounded-full transition-all duration-300 ${
                    idx <= currentStep ? 'bg-brand-matcha' : 'bg-brand-clay-highest'
                  }`}
                />
              ))}
            </div>
          </div>

          <h3 className="font-serif text-2xl text-brand-dark mb-6 leading-tight">
            {QUIZ_QUESTIONS[currentStep].text}
          </h3>

          <div className="space-y-3">
            {QUIZ_QUESTIONS[currentStep].options.map((opt, oIdx) => (
              <button
                key={oIdx}
                onClick={() => handleOptionSelect(QUIZ_QUESTIONS[currentStep].id, opt.value, opt.tagMatch)}
                className="w-full text-left p-4 rounded-xl bg-brand-beige border border-[#ccc6bb]/30 hover:border-brand-matcha/50 hover:bg-[#fcfbf9] transition-all duration-200 clay-shadow text-brand-dark hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-sans text-sm font-medium">{opt.text}</span>
                  <div className="w-4 h-4 rounded-full border border-brand-outline/40 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-transparent hover:bg-brand-matcha" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-4">
          {recommendation && (
            <div className="animate-fade-in-scale">
              <div className="w-16 h-16 bg-brand-matcha-light rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-brand-matcha-text" />
              </div>
              
              <span className="text-xs tracking-widest text-brand-matcha-text font-bold uppercase font-sans">
                YOUR PERFECT MINDFUL COMPANION
              </span>
              
              <h3 className="font-serif text-3xl text-brand-dark mt-2 mb-4">
                {recommendation.name}
              </h3>

              <div className="max-w-md mx-auto mb-6">
                <div className="rounded-2xl overflow-hidden mb-4 clay-shadow">
                  <img
                    src={recommendation.image}
                    alt={recommendation.name}
                    className="w-full h-48 object-cover object-center"
                  />
                </div>
                <p className="text-sm text-brand-outline leading-relaxed">
                  {recommendation.description}
                </p>
                <p className="text-lg font-serif text-brand-wood font-semibold mt-3">
                  ₹{recommendation.price.toFixed(2)}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <button
                  onClick={handleAddRecommended}
                  className="w-full sm:w-auto bg-brand-matcha hover:bg-brand-matcha/90 text-white font-sans font-bold text-sm uppercase tracking-wider py-3.5 px-8 rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <Coffee className="w-4 h-4" />
                  Add to Slow Cart
                </button>
                <button
                  onClick={resetQuiz}
                  className="w-full sm:w-auto text-[#705a49] bg-brand-clay hover:bg-brand-clay-high text-sm font-sans font-bold py-3 px-6 rounded-full flex items-center justify-center gap-2 transition-colors border border-brand-outline/20"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Whisk Another Ritual
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
