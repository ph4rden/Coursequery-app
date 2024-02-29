import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (name: string) => void;
}

export default function Modal({ isOpen, onClose, onAdd }: ModalProps) {
    const [scheduleName, setScheduleName] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onAdd(scheduleName);
        setScheduleName("");
        onClose();
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-[100]">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3 text-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Add Schedule
                    </h3>
                    <div className="mt-2 px-7 py-3">
                        <form onSubmit={handleSubmit}>
                            <Input
                                onChange={(e) =>
                                    setScheduleName(e.target.value)
                                }
                                value={scheduleName}
                                placeholder="Schedule Name"
                            />
                            <div className="flex justify-evenly items-center px-4 py-3">
                                <Button onClick={handleSubmit}>
                                    {" "}
                                    Add Schedule
                                </Button>
                                <Button variant="secondary" onClick={onClose}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
