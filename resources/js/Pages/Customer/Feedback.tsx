// resources/js/Pages/Customer/Feedback.tsx
import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Components/Layout/AuthenticatedLayout";
import { Button } from "@/Components/UI/Button";
import { Input } from "@/Components/UI/Input";
import { cn } from "@/lib/utils";
import {
    HiOutlineStar,
    HiOutlineCamera,
    HiOutlinePaperClip,
} from "react-icons/hi2";

interface FeedbackForm {
    type: "suggestion" | "complaint" | "praise" | "bug";
    title: string;
    description: string;
    rating: number;
    attachments?: File[];
}

const feedbackTypes = [
    { id: "suggestion", label: "Suggestion", icon: "💡", color: "primary" },
    { id: "complaint", label: "Complaint", icon: "⚠️", color: "error" },
    { id: "praise", label: "Praise", icon: "🎉", color: "success" },
    { id: "bug", label: "Bug Report", icon: "🐛", color: "warning" },
];

const ratingMessages = {
    1: "Very Poor - We're sorry to hear that. Please tell us more.",
    2: "Poor - We appreciate your honest feedback.",
    3: "Average - Thank you for sharing your experience.",
    4: "Good - We're glad you enjoyed it!",
    5: "Excellent - We're thrilled you loved it!",
};

export default function CustomerFeedback() {
    const [formData, setFormData] = useState<FeedbackForm>({
        type: "suggestion",
        title: "",
        description: "",
        rating: 0,
    });
    const [hoveredRating, setHoveredRating] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [attachments, setAttachments] = useState<File[]>([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!formData.title.trim()) {
            alert("Please enter a subject");
            return;
        }
        if (!formData.description.trim()) {
            alert("Please enter your feedback message");
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            router.post("/feedback", { ...formData, attachments });
            setIsSubmitting(false);
        }, 1000);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setAttachments(Array.from(e.target.files));
        }
    };

    const removeAttachment = (index: number) => {
        setAttachments(attachments.filter((_, i) => i !== index));
    };

    const showRating =
        formData.type === "praise" || formData.type === "complaint";

    return (
        <>
            <Head title="Send Feedback - Kaykay's Dairy" />
            <AuthenticatedLayout>
                <div className="p-4 md:p-6 lg:p-10 max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-6 md:mb-8 text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary-container/20 mb-3 md:mb-4">
                            <span className="material-symbols-outlined text-2xl md:text-3xl text-primary">
                                feedback
                            </span>
                        </div>
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold font-headline text-on-surface mb-2">
                            We Value Your Feedback
                        </h1>
                        <p className="text-sm md:text-base text-on-surface-variant max-w-2xl mx-auto">
                            Help us serve you better by sharing your experience.
                            Your feedback helps us improve our products and
                            services.
                        </p>
                    </div>

                    {/* Feedback Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5 md:space-y-8"
                    >
                        {/* Feedback Type Selection */}
                        <div className="bg-surface-container-lowest rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm">
                            <label className="block text-xs md:text-sm font-bold text-on-surface-variant mb-3 md:mb-4 uppercase tracking-wider">
                                Feedback Type
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
                                {feedbackTypes.map((type) => (
                                    <button
                                        key={type.id}
                                        type="button"
                                        onClick={() =>
                                            setFormData({
                                                ...formData,
                                                type: type.id as any,
                                                rating: 0,
                                            })
                                        }
                                        className={cn(
                                            "flex flex-col items-center gap-1 md:gap-2 p-3 md:p-4 rounded-xl transition-all border-2",
                                            formData.type === type.id
                                                ? `border-${type.color} bg-${type.color}/10`
                                                : "border-transparent bg-surface-container-low hover:bg-surface-container"
                                        )}
                                    >
                                        <span className="text-xl md:text-2xl">
                                            {type.icon}
                                        </span>
                                        <span
                                            className={cn(
                                                "text-xs md:text-sm font-bold",
                                                formData.type === type.id
                                                    ? `text-${type.color}`
                                                    : "text-on-surface-variant"
                                            )}
                                        >
                                            {type.label}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Rating Section - Now shows for all types */}
                        <div className="bg-surface-container-lowest rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm">
                            <label className="block text-xs md:text-sm font-bold text-on-surface-variant mb-3 md:mb-4 uppercase tracking-wider">
                                Rate Your Experience
                            </label>
                            <div className="flex gap-1 md:gap-2 justify-center">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() =>
                                            setFormData({
                                                ...formData,
                                                rating: star,
                                            })
                                        }
                                        onMouseEnter={() =>
                                            setHoveredRating(star)
                                        }
                                        onMouseLeave={() => setHoveredRating(0)}
                                        className="p-1 md:p-2 transition-transform hover:scale-110 focus:outline-none"
                                    >
                                        <HiOutlineStar
                                            className={cn(
                                                "w-6 h-6 md:w-8 md:h-10 transition-all",
                                                hoveredRating >= star ||
                                                    formData.rating >= star
                                                    ? "fill-primary text-primary"
                                                    : "text-on-surface-variant"
                                            )}
                                        />
                                    </button>
                                ))}
                            </div>
                            {formData.rating > 0 && (
                                <p className="text-center text-xs md:text-sm text-on-surface-variant mt-3">
                                    {
                                        ratingMessages[
                                            formData.rating as keyof typeof ratingMessages
                                        ]
                                    }
                                </p>
                            )}
                            {showRating && formData.rating === 0 && (
                                <p className="text-center text-xs text-error mt-3">
                                    Please rate your experience
                                </p>
                            )}
                        </div>

                        {/* Title Input */}
                        <div className="bg-surface-container-lowest rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm">
                            <Input
                                label="Subject"
                                placeholder="Brief summary of your feedback..."
                                value={formData.title}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        title: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>

                        {/* Description Textarea */}
                        <div className="bg-surface-container-lowest rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm">
                            <label className="block text-xs md:text-sm font-bold text-on-surface-variant mb-2 md:mb-3 uppercase tracking-wider">
                                Your Message
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        description: e.target.value,
                                    })
                                }
                                rows={5}
                                className="w-full px-3 md:px-4 py-2 md:py-3 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary text-on-surface text-sm md:text-base"
                                placeholder="Please share your experience in detail..."
                                required
                            />
                        </div>

                        {/* Attachment Section */}
                        <div className="bg-surface-container-lowest rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm">
                            <label className="block text-xs md:text-sm font-bold text-on-surface-variant mb-2 md:mb-3 uppercase tracking-wider">
                                Attachments (Optional)
                            </label>
                            <div className="border-2 border-dashed border-outline-variant/30 rounded-xl p-4 md:p-6 text-center hover:border-primary transition-colors">
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*,.pdf"
                                    className="hidden"
                                    id="file-upload"
                                    onChange={handleFileChange}
                                />
                                <label
                                    htmlFor="file-upload"
                                    className="cursor-pointer"
                                >
                                    <div className="flex flex-col items-center gap-2">
                                        <HiOutlineCamera className="w-8 h-8 md:w-10 md:h-10 text-on-surface-variant" />
                                        <p className="text-xs md:text-sm text-on-surface-variant">
                                            Click to upload images or documents
                                        </p>
                                        <p className="text-[10px] md:text-xs text-on-surface-variant/60">
                                            PNG, JPG, PDF up to 5MB
                                        </p>
                                    </div>
                                </label>
                            </div>

                            {/* Attachment Preview */}
                            {attachments.length > 0 && (
                                <div className="mt-3 space-y-2">
                                    {attachments.map((file, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between p-2 bg-surface-container-low rounded-lg"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-sm">
                                                    description
                                                </span>
                                                <span className="text-xs text-on-surface-variant truncate max-w-[150px] md:max-w-xs">
                                                    {file.name}
                                                </span>
                                                <span className="text-[10px] text-on-surface-variant/60">
                                                    {(file.size / 1024).toFixed(
                                                        1
                                                    )}{" "}
                                                    KB
                                                </span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeAttachment(index)
                                                }
                                                className="text-error hover:underline text-xs"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="flex flex-col-reverse md:flex-row justify-end gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.visit("/dashboard")}
                                className="w-full md:w-auto"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="primary"
                                disabled={
                                    isSubmitting ||
                                    (showRating && formData.rating === 0)
                                }
                                className="w-full md:w-auto"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Sending...
                                    </div>
                                ) : (
                                    "Send Feedback"
                                )}
                            </Button>
                        </div>
                    </form>

                    {/* Recent Feedback Note */}
                    <div className="mt-6 md:mt-8 p-3 md:p-4 bg-surface-container-low rounded-xl text-center">
                        <p className="text-xs md:text-sm text-on-surface-variant">
                            <span className="material-symbols-outlined text-sm align-middle">
                                schedule
                            </span>
                            We typically respond to feedback within 24-48 hours.
                        </p>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
