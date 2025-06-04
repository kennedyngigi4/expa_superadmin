"use client";

import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface UserModalProps {
    triggerText: string;
    triggerIcon?: LucideIcon;
    title: string;
    description: string;
    children: React.ReactNode;
    buttonText: string;
    onClick: () => void;
}


const UserModal = ({ triggerText, triggerIcon, title, description, children, buttonText, onClick }: UserModalProps ) => {
  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button size="sm" variant="outline" className="cursor-pointer">{triggerText}</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    {title}
                </DialogTitle>
                <DialogDescription className="text-slate-500">
                    {description}
                </DialogDescription>
            </DialogHeader>
            <div>
                {children}
            </div>
            <DialogFooter>
                <Button onClick={onClick} className="cursor-pointer">{buttonText}</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default UserModal