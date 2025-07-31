import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Book, LoaderCircle, PlayCircle, Settings } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react'
import { toast } from 'sonner';

function CourseCard({ course, refreshData }) {
    const courseJson = course?.courseJson?.course;
    const [loading, setLoading] = useState(false);
    const onEnrollCourse = async () => {
        try {
            setLoading(true);
            const result = await axios.post('/api/enroll-course', {
                courseId: course?.cid
            });
            console.log(result.data);
            if (result.data.resp) {
                toast.warning('Already Enrolled!');
                setLoading(false);
                return;
            }
            toast.success('Enrolled!')
            setLoading(false);
            refreshData()
        }
        catch (e) {
            toast.error('Server side error')
            setLoading(false);
        }
    }

    return (
        <div className='shadow rounded-xl flex flex-col'>
            {course?.bannerImageUrl ? (
                <Image src={course.bannerImageUrl} alt={course.name}
                    width={400}
                    height={300}
                    className='w-full aspect-video rounded-t-xl object-cover'
                />
            ) : (
                <div className='w-full aspect-video rounded-t-xl bg-slate-200 flex items-center justify-center'>
                    <Book className='h-12 w-12 text-slate-500' />
                </div>
            )}
            <div className='p-3 flex flex-col gap-3'>
                <h2 className='font-bold text-lg'>{courseJson?.name}</h2>
                <p className='line-clamp-3 text-gray-400 text-sm'>{courseJson?.description}</p>
                <div className='flex justify-between items-center'>
                    <h2 className='flex items-center text-sm gap-2'><Book className='text-primary h-5 w-5' /> {courseJson?.noOfChapters} Chapters </h2>
                    {course?.courseContent?.length ?
                        <Button size={'sm'}
                            onClick={onEnrollCourse}
                            disabled={loading}
                        > {loading ? <LoaderCircle className='animate-spin' /> : <PlayCircle />}  Enroll Course </Button> :
                        <Link href={'/workspace/edit-course/' + course?.cid}> <Button size={'sm'} variant='outline'> <Settings /> Generate Course</Button></Link>}
                </div>
            </div>
        </div>
    )
}

export default CourseCard