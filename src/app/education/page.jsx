'use client'
import React, {useState , useEffect } from 'react';
import '../styles/Education.css'
import Nav from '@/components/commonComp/Nav'
import Footer from '@/components/commonComp/Footer';

import { FaLink } from 'react-icons/fa';
const Education = () => {
    const [theme, settheme] = useState('light')

    useEffect(() => {
        // if (localStorage.getItem("theme") !== "light")
        //     localStorage.setItem("theme", "dark")

        let themeVal = localStorage.getItem("theme")
        settheme(themeVal)

    }, [])

    useEffect(() => {
        // Update document title when component mounts
        document.title = 'SoulMindᴮᴱᵀᴬ - Education';
        // Clean up document title when component unmounts
        return () => {
            document.title = 'SoulMind';
        }
    }, []);

    // An array of educational resources
    const resources = [
        {
            title: 'Understanding Anxiety',
            description: 'Learn about the different types of anxiety disorders, their causes, and evidence-based treatments. Gain a deeper understanding of the symptoms and triggers of anxiety, as well as effective coping strategies to manage anxiety in daily life.',
            link: 'https://www.nimh.nih.gov/health/topics/anxiety-disorders',
        },
        {
            title: 'Managing Stress',
            description: 'Discover effective strategies for managing stress, including relaxation techniques, time management, and healthy coping skills. Learn about the impact of stress on mental health and ways to reduce stress levels, both in the short-term and long-term, to promote overall well-being.',
            link: 'https://www.apa.org/topics/stress/',
        },
        {
            title: 'Improving Sleep',
            description: 'Understand the importance of sleep for mental health and learn tips for improving sleep quality and quantity. Explore the science of sleep, common sleep disorders, and evidence-based techniques for establishing healthy sleep habits to enhance overall mental well-being.',
            link: 'https://www.sleepfoundation.org/mental-health',
        },
        {
            title: 'Coping with Depression',
            description: 'Learn about the symptoms, causes, and treatment options for depression, a common mental health condition that affects mood and daily functioning. Gain insights into the various types of depression, risk factors, and evidence-based interventions for managing and coping with depression.',
            link: 'https://www.nimh.nih.gov/health/topics/depression/index.shtml',
        },
        {
            title: 'Managing Anxiety in Children and Teens',
            description: 'Find information on how to recognize and manage anxiety in children and adolescents, including tips for parents and caregivers. Learn about the unique challenges of anxiety in young people, effective communication strategies, and supportive interventions to help children and teens cope with anxiety.',
            link: 'https://www.adaa.org/living-with-anxiety/children',
        },
        {
            title: 'Building Resilience',
            description: 'Discover strategies for building resilience, which is the ability to cope with stress, adversity, and life challenges. Learn about the factors that contribute to resilience, practical ways to enhance resilience, and how resilience can promote mental well-being and psychological growth.',
            link: 'https://www.apa.org/topics/resilience',
        },
        {
            title: 'Understanding Trauma',
            description: 'Learn about the effects of trauma on mental health and strategies for coping with traumatic experiences. Gain insights into different types of trauma, their impact on mental health, and evidence-based interventions for managing trauma-related symptoms and promoting healing and recovery.',
            link: 'https://www.samhsa.gov/trauma-violence',
        },
        {
            title: 'Mindfulness Meditation',
            description: 'Explore the practice of mindfulness meditation, which involves paying attention to the present moment with non-judgmental awareness, and its benefits for mental health. Learn about the science behind mindfulness, various mindfulness techniques, and how regular practice can promote relaxation, stress reduction, and emotional well-being.',
            link: 'https://www.mayoclinic.org/healthy-lifestyle/consumer-health/in-depth/mindfulness-exercises/art-20046356',
        },
        {
            title: 'Supporting a Loved One with Mental Illness',
            description: 'Find resources and tips for supporting a friend or family member with mental illness, including how to offer emotional support, communicate effectively, and provide practical help.',
            link: 'https://www.nami.org/Find-Support/Family-Members-and-Caregivers',
        }
        // Add more resources as needed
    ];


    return (
        <>
            <Nav />
            <div className={theme + " edupage"}>
                <header>
                    <h1>Educational resources for mental well-being.</h1>
                    <p className="page_description">
                        Explore these educational resources to learn more about mental health, coping strategies, and ways to promote overall well-being.
                    </p>
                </header>
                <div className="allresources">
                    {
                        resources.map((val) => {
                            return (
                                <>
                                    <div className={theme + " res"}>
                                        <h2>{val.title}</h2>
                                        <p>{val.description}</p>
                                        <a href={val.link} target="_blank" rel="noreferrer">  <FaLink />&nbsp;{val.title} </a>
                                    </div>
                                </>

                            )
                        })
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}


export default Education
