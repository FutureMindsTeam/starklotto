"use client";

import React, { useEffect, useState } from "react";
import {
  UserIcon,
  EnvelopeIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { ContactUsFormData } from "~~/interfaces/contact-us";
import { CONTACT_US_SHEET_SCRIPT } from "~~/utils/Constants";
import { useForm } from "react-hook-form";
import { contactUsSchema } from "~~/utils/validations/contact-us";
import { zodResolver } from "@hookform/resolvers/zod";

const ContactUsPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactUsFormData>({
    resolver: zodResolver(contactUsSchema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = async (data: ContactUsFormData) => {
    setIsSubmitting(true);
    try {
      await fetch(CONTACT_US_SHEET_SCRIPT, {
        method: "POST",
        mode: "no-cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      setIsSubmitted(true);
    } catch (error) {
      setSubmitError("There was a problem sending the message.");
    }

    // Reiniciar el formulario
    setIsSubmitting(false);
  };

  useEffect(() => {
    if (submitError) {
      setTimeout(() => {
        setSubmitError("");
      }, 3000);
    }

    if (isSubmitted) {
      setTimeout(() => {
        setIsSubmitted(false);
        reset();
      }, 3000);
    }
  }, [isSubmitted, submitError, reset]);

  return (
    <div className="text-white text-center py-20 px-10 md:px-0">
      <h1 className="text-xl font-bold uppercase sm:text-[2rem] md:text-[4rem]">Contact Us</h1>
      <p className="m-4 md:m-8 text-[1.125rem] md:text-[2rem] uppercase">Have any questions? Reach out to us!</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 md:mt-10 max-w-md mx-auto bg-[#1A1A1A] p-10 md:p-8 rounded-[1rem]"
      >
        <div className="mb-6 md:mb-8">
          <label
            className="flex text-left mb-2 uppercase"
            htmlFor="fullName"
          >
            Full Name
            <UserIcon className="h-5 w-5 text-white ml-2 mb-4 md:mb-6" />
          </label>
          <input
            type="text"
            {...register("name")}
            className="w-full p-3 border border-gray-300 rounded bg-[#2A2A2A] text-white text-sm border-none rounded-[0.5rem]"
            placeholder="YOUR NAME"
            disabled={isSubmitting || isSubmitted}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div className="mb-6 md:mb-8">
          <label className="flex text-left mb-2 uppercase" htmlFor="email">
            Email Address
            <EnvelopeIcon className="h-5 w-5 text-white ml-2 mb-4 md:mb-6" />
          </label>
          <input
            type="email"
            {...register("email")}
            className="w-full p-3 border border-gray-300 rounded bg-[#2A2A2A] text-white text-sm border-none rounded-[0.5rem]"
            placeholder="YOUR@EMAIL.COM"
            disabled={isSubmitting || isSubmitted}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-2 md:mb-6">
          <label className="flex text-left mb-2 uppercase" htmlFor="message">
            Your Message
            <PencilSquareIcon className="h-5 w-5 text-white ml-2 mb-4 md:mb-6" />
          </label>
          <textarea
            {...register("message")}
            className="w-full p-3 border border-gray-300 rounded bg-[#2A2A2A] text-white text-sm border-none rounded-[0.5rem]"
            rows={4}
            placeholder="YOUR MESSAGE..."
            disabled={isSubmitting || isSubmitted}
          />
          {errors.message && (
            <p className="text-red-500">{errors.message.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-gradient-to-r from-[#3A0909] to-[#000000] text-xs text-white py-4 px-10 rounded-full uppercase"
          disabled={isSubmitting || isSubmitted}
        >
          {isSubmitting ? "Sending..." : isSubmitted ? "Sent!" : "Send Message"}
        </button>
      </form>
      {submitError && <p className="text-red-500 mt-4">{submitError}</p>}
      {isSubmitted && !submitError && (
        <p className="mt-4 text-yellow-400 text-lg">
          Message sent successfully!
        </p>
      )}
    </div>
  );
};

export default ContactUsPage;
