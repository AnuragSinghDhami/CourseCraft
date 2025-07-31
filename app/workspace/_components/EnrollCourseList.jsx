"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import EnrollCourseCard from './EnrollCourseCard';
import { Skeleton } from '@/components/ui/skeleton';

function EnrollCourseList() {

    const [enrolledCourseList, setEnrolledCourseList] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        GetEnrolledCourse();
    }, [])

    const GetEnrolledCourse = async () => {
        setLoading(true);
        const result = await axios.get('/api/enroll-course');
        console.log(result.data);
        setEnrolledCourseList(result.data);
        setLoading(false);
    }
    return (
        <div className='mt-3'>
            {enrolledCourseList?.length > 0 &&
                <h2 className='font-bold text-xl'>Continue Learning your courses</h2>
            }
            <div className='grid mt-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5'>
                {enrolledCourseList?.length > 0 ? enrolledCourseList?.map((course, index) => (
                    <EnrollCourseCard course={course?.courses} enrollCourse={course?.enrollCourse} key={index} />
                )) :
                    loading && [1, 2, 3, 4, 5].map((item, index) => (
                        <Skeleton className={'w-full h-[250px]'} key={index} />
                    ))
                }
            </div>

        </div>
    )
}

export default EnrollCourseList