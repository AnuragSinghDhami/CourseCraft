import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress';
import { Book, PlayCircle } from 'lucide-react'; // Added Book icon import
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

function EnrollCourseCard({ course, enrollCourse }) {
    const courseJson = course?.courseJson?.course;

    const CalculatePerProgress = () => {
        const totalChapters = course?.courseContent?.length;
        if (!totalChapters) {
            return 0; // Avoid division by zero
        }
        const completedChapters = enrollCourse?.completedChapters?.length || 0;
        return (completedChapters / totalChapters) * 100;
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
                <div className=''>
                    <h2 className='flex justify-between text-sm text-primary'>Progress <span>{CalculatePerProgress().toFixed(0)}%</span></h2>
                    <Progress value={CalculatePerProgress()} />
                    <Link href={'/workspace/view-course/' + course?.cid}>
                        <Button className={'w-full mt-3'}> <PlayCircle /> Continue Learning </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default EnrollCourseCard