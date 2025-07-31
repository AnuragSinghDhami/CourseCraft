import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { v4 as uuidv4 } from 'uuid';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { Loader2Icon, Sparkle } from 'lucide-react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { toast } from 'sonner'

function AddNewCourseDialog({ children }) {

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        includeVideo: false,
        noOfChapter: 1,
        category: '',
        level: ''
    });
    const router = useRouter();

    const onHandleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        console.log(formData);
    }

    const onGenerate = async () => {
        console.log(formData);
        const courseId = uuidv4();

        try {
            setLoading(true);
            const result = await axios.post('/api/generate-course-layout', {
                ...formData,
                courseId: courseId
            });

            if (result.data.resp == 'limit exceed') {
                toast.warning('Please subscribe to plan!')
                router.push('/workspace/billing');
            }
            setLoading(false)
            router.push('/workspace/edit-course/' + result.data?.courseId);
        }
        catch (e) {
            setLoading(false)
            console.log(e)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Course Using AI</DialogTitle>
                    <DialogDescription asChild>
                        <div className='flex flex-col gap-4 mt-3'>
                            <div>
                                <label>Course Name</label>
                                <Input placeholder="Course Name"
                                    onChange={(event) => onHandleInputChange('name', event?.target.value)} />
                            </div>
                            <div>
                                <label>Course Description (Optional)</label>
                                <Textarea placeholder="Course Description"
                                    onChange={(event) => onHandleInputChange('description', event?.target.value)} />
                            </div>
                            <div>
                                <label>No. Of Chapters</label>
                                <Input placeholder="No of chapters" type='number'
                                    onChange={(event) => onHandleInputChange('noOfChapters', event?.target.value)} />
                            </div>
                            <div className='flex gap-3 items-center'>
                                <label>Include Video</label>
                                <Switch
                                    onCheckedChange={() => onHandleInputChange('includeVideo', !formData?.includeVideo)} />
                            </div>
                            <div>
                                <label className=''>Difficuly Level</label>
                                <Select onValueChange={(value) => onHandleInputChange('level', value)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Difficuly Level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="beginner">Beginnger</SelectItem>
                                        <SelectItem value="moderate">Moderate</SelectItem>
                                        <SelectItem value="advanced">Advanced</SelectItem>
                                    </SelectContent>
                                </Select>

                            </div>
                            <div>
                                <label>Category</label>
                                <Input placeholder="Category (Sperated by Comma)"
                                    onChange={(event) => onHandleInputChange('category', event?.target.value)} />
                            </div>

                            <div className='mt-5'>
                                <Button className={'w-full'} onClick={onGenerate} disabled={loading}>
                                    {loading ? <Loader2Icon className='animate-spin' /> :
                                        <Sparkle />} Generate Course</Button>
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}

export default AddNewCourseDialog