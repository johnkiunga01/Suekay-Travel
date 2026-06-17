'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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

const inquiryFormSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(8, 'Phone number must be at least 8 characters'),
  travelDates: z.string().min(1, 'Travel dates are required'),
  groupSize: z.string().min(1, 'Group size is required'),
  budget: z.string().min(1, 'Budget range is required'),
  message: z.string().optional().default(''),
  tourReference: z.string().optional().default(''),
});

type InquiryFormValues = z.infer<typeof inquiryFormSchema>;

interface InquiryFormProps {
  tourName?: string;
  destination?: string;
}

export function InquiryForm({ tourName, destination }: InquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<InquiryFormValues>({
    resolver: zodResolver(inquiryFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      travelDates: '',
      groupSize: '',
      budget: '',
      message: '',
      tourReference: tourName && destination ? `${tourName} - ${destination}` : '',
    },
  });

  const onSubmit = async (values: InquiryFormValues) => {
    setIsSubmitting(true);
    try {
      console.log('Inquiry Form Submitted:', values);
      // TODO: Wire to API endpoint
      form.reset();
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">First Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your first name"
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
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Last Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your last name"
                    className="border-gray-300 focus:border-[#3d3f97] focus:ring-[#3d3f97]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
        </div>

        <FormField
          control={form.control}
          name="travelDates"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Preferred Travel Dates</FormLabel>
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

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="groupSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Group Size</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="Select group size" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? 'person' : 'people'}
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
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Budget Range</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="under-2000">Under $2,000</SelectItem>
                    <SelectItem value="2000-5000">$2,000 - $5,000</SelectItem>
                    <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                    <SelectItem value="10000-20000">$10,000 - $20,000</SelectItem>
                    <SelectItem value="over-20000">Over $20,000</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your travel preferences, special requirements, or any questions you have..."
                  className="min-h-[120px] border-gray-300 focus:border-[#3d3f97] focus:ring-[#3d3f97]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <input
          type="hidden"
          value={form.watch('tourReference')}
          {...form.register('tourReference')}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#3d3f97] hover:bg-[#2d2f77] text-white font-semibold py-2 h-auto"
        >
          {isSubmitting ? 'Submitting...' : 'Send Inquiry'}
        </Button>
      </form>
    </Form>
  );
}
