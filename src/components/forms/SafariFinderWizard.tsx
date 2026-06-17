'use client';

import { useState } from 'react';
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface RecommendedTour {
  id: string;
  name: string;
  destination: string;
  description: string;
  price: string;
  highlights: string[];
}

const recommendationsMap: Record<string, RecommendedTour[]> = {
  'big-five-lodge-3days': [
    {
      id: '1',
      name: 'Classic Big Five Safari',
      destination: 'Serengeti National Park',
      description:
        "Experience the iconic Big Five in one of Africa's most prestigious national parks.",
      price: '$2,500 - $3,500 per person',
      highlights: [
        'Guided game drives',
        'Luxury lodge accommodation',
        'Professional naturalist guides',
      ],
    },
    {
      id: '2',
      name: 'Big Five Explorer',
      destination: 'Kruger National Park',
      description:
        'Immerse yourself in wildlife viewing with daily safari excursions.',
      price: '$2,000 - $2,800 per person',
      highlights: [
        '3 days 2 nights',
        'All-inclusive meals',
        'Game drive equipment',
      ],
    },
  ],
  'migration-lodge-5days': [
    {
      id: '3',
      name: 'Great Migration Experience',
      destination: 'Serengeti - Maasai Mara',
      description: "Witness one of nature's greatest spectacles as millions of wildebeest migrate.",
      price: '$3,500 - $5,000 per person',
      highlights: [
        'River crossing viewing',
        'Expert wildlife photographers',
        'Luxury tented camps',
      ],
    },
    {
      id: '4',
      name: 'Migration Mobile Camp',
      destination: 'Northern Serengeti',
      description: 'Follow the migration with our mobile camp setup.',
      price: '$3,000 - $4,500 per person',
      highlights: [
        'Flexible camp locations',
        'Intimate group sizes',
        'Bush dinners',
      ],
    },
  ],
  'gorillas-camping-7plus': [
    {
      id: '5',
      name: 'Gorilla Trekking Adventure',
      destination: 'Bwindi Impenetrable Forest',
      description:
        'Trek through the misty forests to encounter mountain gorillas in their natural habitat.',
      price: '$4,000 - $6,000 per person',
      highlights: [
        'Expert gorilla trackers',
        'Small group expeditions',
        'Cultural village visits',
      ],
    },
    {
      id: '6',
      name: 'Gorilla & Wildlife Expedition',
      destination: 'Virunga Mountains',
      description: 'Combine gorilla trekking with broader wildlife exploration.',
      price: '$5,000 - $7,500 per person',
      highlights: [
        'Multi-day treks',
        'Volcanic landscapes',
        'Golden monkey encounters',
      ],
    },
  ],
};

type Answer = string | null;

interface Answers {
  excitement: Answer;
  comfort: Answer;
  duration: Answer;
  season: Answer;
}

export function SafariFinderWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>({
    excitement: null,
    comfort: null,
    duration: null,
    season: null,
  });
  const [recommendations, setRecommendations] = useState<RecommendedTour[]>([]);

  const excitementOptions = [
    { id: 'big-five', label: 'Big Five', emoji: '🦁' },
    { id: 'migration', label: 'Great Migration', emoji: '🦓' },
    { id: 'gorillas', label: 'Gorillas', emoji: '🦍' },
    { id: 'birds', label: 'Birds', emoji: '🦅' },
    { id: 'photography', label: 'Photography', emoji: '📸' },
  ];

  const comfortOptions = [
    { id: 'camping', label: 'Camping', description: 'Close to nature' },
    { id: 'lodge', label: 'Lodge', description: 'Comfortable comfort' },
    { id: 'luxury', label: 'Luxury Camp', description: 'Premium experience' },
  ];

  const durationOptions = [
    { id: '3days', label: '3 Days', duration: 'Quick escape' },
    { id: '5days', label: '5 Days', duration: 'Perfect balance' },
    { id: '7plus', label: '7+ Days', duration: 'Deep immersion' },
  ];

  const seasonOptions = [
    { id: 'jan-mar', label: 'Jan - Mar', season: 'Dry & warm' },
    { id: 'apr-jun', label: 'Apr - Jun', season: 'Green season' },
    { id: 'jul-sep', label: 'Jul - Sep', season: 'Cool & ideal' },
    { id: 'oct-dec', label: 'Oct - Dec', season: 'Hot & rainy' },
  ];

  const handleSelectAnswer = (key: keyof Answers, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      generateRecommendations();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateRecommendations = () => {
    const key = `${answers.excitement}-${answers.comfort}-${answers.duration}`;
    const tours =
      recommendationsMap[key] ||
      recommendationsMap['big-five-lodge-3days'];
    setRecommendations(tours);
    setCurrentStep(5);
  };

  const handleReset = () => {
    setCurrentStep(1);
    setAnswers({
      excitement: null,
      comfort: null,
      duration: null,
      season: null,
    });
    setRecommendations([]);
  };

  const progressPercentage = (currentStep / 5) * 100;

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Safari Finder</h1>
          <div className="text-sm font-medium text-gray-600">
            Step {currentStep} of 5
          </div>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full bg-gradient-to-r from-[#3d3f97] to-[#4eadb3] transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {currentStep === 1 && (
        <div className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">
              What excites you most?
            </h2>
            <p className="text-gray-600">
              Select the wildlife or experience that draws you to Africa
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            {excitementOptions.map((option) => (
              <Card
                key={option.id}
                onClick={() => handleSelectAnswer('excitement', option.id)}
                className={`cursor-pointer border-2 p-4 text-center transition-all ${
                  answers.excitement === option.id
                    ? 'border-[#3d3f97] bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-3xl">{option.emoji}</div>
                <div className="mt-2 font-semibold text-gray-900">
                  {option.label}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">
              What's your comfort level?
            </h2>
            <p className="text-gray-600">
              Choose the accommodation style that suits you
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {comfortOptions.map((option) => (
              <Card
                key={option.id}
                onClick={() => handleSelectAnswer('comfort', option.id)}
                className={`cursor-pointer border-2 p-4 transition-all ${
                  answers.comfort === option.id
                    ? 'border-[#4eadb3] bg-teal-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-semibold text-gray-900">{option.label}</div>
                <div className="mt-2 text-sm text-gray-600">{option.description}</div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">
              How long do you have?
            </h2>
            <p className="text-gray-600">
              Select your ideal trip duration
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {durationOptions.map((option) => (
              <Card
                key={option.id}
                onClick={() => handleSelectAnswer('duration', option.id)}
                className={`cursor-pointer border-2 p-4 transition-all ${
                  answers.duration === option.id
                    ? 'border-[#3d3f97] bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl font-bold text-[#3d3f97]">
                  {option.label}
                </div>
                <div className="mt-2 text-sm text-gray-600">{option.duration}</div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {currentStep === 4 && (
        <div className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">
              When are you planning to go?
            </h2>
            <p className="text-gray-600">
              Choose your preferred season
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
            {seasonOptions.map((option) => (
              <Card
                key={option.id}
                onClick={() => handleSelectAnswer('season', option.id)}
                className={`cursor-pointer border-2 p-4 text-center transition-all ${
                  answers.season === option.id
                    ? 'border-[#4eadb3] bg-teal-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-semibold text-gray-900">{option.label}</div>
                <div className="mt-2 text-xs text-gray-600">{option.season}</div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {currentStep === 5 && (
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#3d3f97]/10 to-[#4eadb3]/10 p-4">
              <Sparkles className="h-5 w-5 text-[#3d3f97]" />
              <h2 className="text-lg font-semibold text-gray-900">
                Your Perfect Safari Awaits
              </h2>
            </div>
            <p className="text-center text-gray-600">
              Based on your preferences, we recommend these tours
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {recommendations.map((tour) => (
              <Card
                key={tour.id}
                className="overflow-hidden border-gray-200 p-4 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-bold text-gray-900">{tour.name}</h3>
                <p className="mt-1 text-sm font-medium text-[#4eadb3]">
                  {tour.destination}
                </p>
                <p className="mt-3 text-sm text-gray-600">{tour.description}</p>

                <div className="mt-4 space-y-2">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Highlights
                    </p>
                    <ul className="mt-2 space-y-1">
                      {tour.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#3d3f97]" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 border-t border-gray-100 pt-4">
                  <p className="text-lg font-bold text-[#3d3f97]">{tour.price}</p>
                </div>

                <Button className="mt-4 w-full bg-[#3d3f97] hover:bg-[#2d2f77]">
                  Learn More
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between gap-3 pt-4">
        <Button
          onClick={handleBack}
          disabled={currentStep === 1}
          variant="outline"
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        {currentStep === 5 ? (
          <Button
            onClick={handleReset}
            className="gap-2 bg-[#4eadb3] hover:bg-[#3e9da3]"
          >
            Start Over
            <Sparkles className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            disabled={
              (currentStep === 1 && !answers.excitement) ||
              (currentStep === 2 && !answers.comfort) ||
              (currentStep === 3 && !answers.duration) ||
              (currentStep === 4 && !answers.season)
            }
            className="gap-2 bg-[#3d3f97] hover:bg-[#2d2f77]"
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
