"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
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
      <h1 className="mt-6 md:mt-10 text-xl font-bold uppercase sm:text-[2rem] md:text-[4rem]">Contact Us</h1>
      <p className="m-4 md:m-8 text-[0.725rem] md:text-[1rem] uppercase text-[#CECDCD]">Have any questions? Reach out to us!</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 md:mt-10 max-w-md mx-auto bg-[#1A1A1A] p-10 md:p-8 rounded-[1rem]"
      >
        <div className="mb-6 md:mb-8">
          <label
            className="flex text-left mb-2 uppercase font-semibold"
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
          <label className="flex text-left mb-2 uppercase font-semibold" htmlFor="email">
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
          <label className="flex text-left mb-2 uppercase font-semibold" htmlFor="message">
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
      <div className="flex flex-col mt-8">
        <p className="text-sm uppercase font-semibold">Or ask in our telegram group</p>
        <Link className="[&>svg]:h-8 [&>svg]:w-8 self-center bg-white rounded-full" href="https://t.me/StarklottoContributors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#24A1DE"
            viewBox="0 0 496 512">
            {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. --> */}
            <path
              d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ContactUsPage;
