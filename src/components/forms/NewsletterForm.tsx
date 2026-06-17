'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Check } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const newsletterFormSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type NewsletterFormValues = z.infer<typeof newsletterFormSchema>;

export function NewsletterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterFormSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: NewsletterFormValues) => {
    setIsSubmitting(true);
    try {
      console.log('Newsletter signup:', values);
      // TODO: Wire to API endpoint
      setIsSuccess(true);
      form.reset();
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error('Subscription error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex items-center justify-center gap-2 rounded-lg bg-green-50 p-4 text-green-700">
        <Check className="h-5 w-5" />
        <span className="font-medium">Thank you for subscribing!</span>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="flex flex-col gap-3 sm:flex-row">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="border-gray-300 focus:border-[#3d3f97] focus:ring-[#3d3f97]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#4eadb3] hover:bg-[#3e9da3] text-white font-semibold px-6 h-auto py-2 whitespace-nowrap"
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
