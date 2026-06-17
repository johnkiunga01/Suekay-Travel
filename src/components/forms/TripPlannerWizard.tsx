'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';

const step1Schema = z.object({
  tripType: z.string().min(1, 'Trip type is required'),
  travelersCount: z.string().min(1, 'Number of travelers is required'),
  dates: z.string().min(1, 'Dates are required'),
});

const step2Schema = z.object({
  budget: z.string().min(1, 'Budget range is required'),
  comfortLevel: z.string().min(1, 'Comfort level is required'),
  interests: z.array(z.string()).min(1, 'Select at least one interest'),
});

const step3Schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(8, 'Phone must be at least 8 characters'),
  specialRequirements: z.string().optional(),
});

type Step1Values = z.infer<typeof step1Schema>;
type Step2Values = z.infer<typeof step2Schema>;
type Step3Values = z.infer<typeof step3Schema>;

type FormValues = Step1Values & Step2Values & Step3Values;

const tripTypes = ['Safari', 'Beach', 'Gorilla Trekking', 'Corporate'];
const interestOptions = ['Wildlife', 'Photography', 'Culture', 'Adventure', 'Relaxation'];
const comfortLevels = ['Budget', 'Mid-range', 'Luxury'];
const budgetRanges = [
  'Under $2,000',
  '$2,000 - $5,000',
  '$5,000 - $10,000',
  '$10,000 - $20,000',
  'Over $20,000',
];

export function TripPlannerWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(step1Schema),
    mode: 'onChange',
    defaultValues: {
      tripType: '',
      travelersCount: '',
      dates: '',
      budget: '',
      comfortLevel: '',
      interests: [],
      name: '',
      email: '',
      phone: '',
      specialRequirements: '',
    },
  });

  const validateStep = async (step: number) => {
    let isValid = false;
    if (step === 1) {
      isValid = await form.trigger(['tripType', 'travelersCount', 'dates']);
    } else if (step === 2) {
      isValid = await form.trigger(['budget', 'comfortLevel', 'interests']);
    } else if (step === 3) {
      isValid = await form.trigger(['name', 'email', 'phone']);
    }
    return isValid;
  };

  const handleNext = async () => {
    if (await validateStep(currentStep)) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      console.log('Trip Planner Summary:', {
        ...values,
        interests: selectedInterests,
      });
      // TODO: Wire to API endpoint
      form.reset();
      setCurrentStep(1);
      setSelectedInterests([]);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressPercentage = (currentStep / 4) * 100;

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2">
        <div className="text-sm font-medium text-gray-600">
          Step {currentStep} of 4
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full bg-[#3d3f97] transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {currentStep === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Let's Plan Your Trip
              </h2>

              <FormField
                control={form.control}
                name="tripType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">What type of trip?</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="border-gray-300">
                          <SelectValue placeholder="Select trip type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {tripTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="travelersCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Number of travelers</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="border-gray-300">
                          <SelectValue placeholder="Select number of travelers" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dates"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      When are you thinking of traveling?
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="e.g., July 15-22, 2024"
                        className="border-gray-300 focus:border-[#3d3f97] focus:ring-[#3d3f97]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Customize Your Experience
              </h2>

              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Budget range</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="border-gray-300">
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {budgetRanges.map((range) => (
                          <SelectItem key={range} value={range}>
                            {range}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="comfortLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Comfort level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="border-gray-300">
                          <SelectValue placeholder="Select comfort level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {comfortLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="interests"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-gray-700">What interests you?</FormLabel>
                    <div className="space-y-3">
                      {interestOptions.map((interest) => (
                        <FormField
                          key={interest}
                          control={form.control}
                          name="interests"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={selectedInterests.includes(interest)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setSelectedInterests([
                                        ...selectedInterests,
                                        interest,
                                      ]);
                                      field.onChange([...selectedInterests, interest]);
                                    } else {
                                      const updated = selectedInterests.filter(
                                        (i) => i !== interest
                                      );
                                      setSelectedInterests(updated);
                                      field.onChange(updated);
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-gray-700 font-normal cursor-pointer">
                                {interest}
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Your Contact Information
              </h2>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your name"
                        className="border-gray-300 focus:border-[#3d3f97] focus:ring-[#3d3f97]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="your.email@example.com"
                        className="border-gray-300 focus:border-[#3d3f97] focus:ring-[#3d3f97]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        className="border-gray-300 focus:border-[#3d3f97] focus:ring-[#3d3f97]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="specialRequirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Special Requirements (Optional)
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any special needs or requests..."
                        className="min-h-[100px] border-gray-300 focus:border-[#3d3f97] focus:ring-[#3d3f97]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Review Your Trip</h2>

              <Card className="space-y-4 border-gray-200 bg-gray-50 p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Trip Type</p>
                    <p className="font-semibold text-gray-900">
                      {form.getValues('tripType')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Travelers</p>
                    <p className="font-semibold text-gray-900">
                      {form.getValues('travelersCount')} people
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Dates</p>
                    <p className="font-semibold text-gray-900">
                      {form.getValues('dates')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Budget</p>
                    <p className="font-semibold text-gray-900">
                      {form.getValues('budget')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Comfort Level</p>
                    <p className="font-semibold text-gray-900">
                      {form.getValues('comfortLevel')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Contact</p>
                    <p className="font-semibold text-gray-900">
                      {form.getValues('name')}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-600">Interests</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedInterests.map((interest) => (
                      <span
                        key={interest}
                        className="inline-block rounded-full bg-[#3d3f97] px-3 py-1 text-sm text-white"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          )}

          <div className="flex justify-between gap-3 pt-4">
            <Button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 1}
              variant="outline"
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>

            {currentStep < 4 ? (
              <Button
                type="button"
                onClick={handleNext}
                className="gap-2 bg-[#3d3f97] hover:bg-[#2d2f77]"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#4eadb3] hover:bg-[#3e9da3]"
              >
                {isSubmitting ? 'Submitting...' : 'Complete Trip Plan'}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
