'use client';
import React, { useEffect, useState } from 'react'
import Nav from '@/components/commonComp/Nav'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import '@/app/styles/appoint.css'


import { getAllappointment } from '@/apis/appointment'

import { auth } from "@/apis/firebaseConfig";

import { Button } from "@/components/ui/button"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import { Timer } from 'lucide-react'

import { Label } from "@/components/ui/label"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup
} from "@/components/ui/select"

import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import Time from './time'

const Page = () => {
  const [profileEMail, setProfileMail] = useState(auth?.currentUser?.email);
  const [userAppointment, setUserAppointment] = useState<any>({
    today: [],
    other: []
  })
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [startTime, setStartTime] = useState<string>('')

  useEffect(() => {
    setProfileMail(auth?.currentUser?.email);
  }, [auth?.currentUser?.email]);

  useEffect(() => {
    getAllAppointments()
  }, [])

  const getAllAppointments = async () => {
    const resp: any = await getAllappointment()
    console.log(resp)
    const todayDate = new Date();
    const formattedTodayDate = todayDate.toDateString();

    if (resp.status === true) {
      let todayM = []
      let others = []
      const Meow = resp.data
      for (var i = 0; i < resp.data.length; i++) {
        const givenDate = new Date(Meow[i].dueDate)
        const givenDateInString = givenDate.toDateString();
        console.log(todayDate < givenDate)
        if (formattedTodayDate === givenDateInString) {
          todayM.push(Meow[i])
        } else {
          others.push(Meow[i]);
        }
      }
      const obj = {
        today: todayM,
        others: others
      }
      setUserAppointment(obj)
    } else {
      console.log("NO DATA")
    }
  }

  useEffect(() => {
    if (userAppointment.today.length !== 0) {
      const today = new Date().toISOString().split('T')[0];

      // Filter meetings for today
      const todaysMeetings = userAppointment.today.filter((meeting: any) => meeting.startTime.startsWith(today));

      // Get the current time
      const currentTime = new Date();
      const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

      // Filter out past meetings and convert start times to minutes
      const futureMeetings = todaysMeetings
        .filter((meeting: any) => {
          const meetingDate = new Date(meeting.startTime);
          const meetingMinutes = meetingDate.getHours() * 60 + meetingDate.getMinutes();
          return meetingMinutes >= currentMinutes;
        })
        .sort((a: any, b: any) => {
          const startTimeA = new Date(a.startTime).getTime();
          const startTimeB = new Date(b.startTime).getTime();
          return startTimeA - startTimeB;
        });
      console.log(futureMeetings);
      const obj = { ...userAppointment }
      obj.today = futureMeetings
      setfinalApp(obj)
    }
  }, [userAppointment])

  const [finalApp, setfinalApp] = useState<any>({})



  const dateFormatting = (dateToBe: any) => {

    const date = new Date(dateToBe);

    const timeFormatIST = date.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' }).replace(/\s/g, '');

    return timeFormatIST
  }

  function getNextHour() {
    const currentTime = new Date()
    let hours = currentTime.getHours()
    let nextHour = (hours + 1) % 24
    setStartTime(`${nextHour < 10 ? "0" : ""}${nextHour}:00`)
  }

  return (
    <div className='w-[100%} h-[100%] text-white'>
      <Nav />
      <div className='mt-[100px] w-full h-auto flex  justify-center gap-1'>

        <div className='w-[50%] h-auto pl-[60px] flex flex-col gap-[50px] pr-[10px] '>
          <h1 className='text-[1.8rem] font-[560] w-[80%] text-center'>Your Sheduled Session With Expert Therapist</h1>
          <div>
            <Accordion type="single" collapsible className="w-full border-none no-underline">
              <AccordionItem value="item-1" className='text-white rounded-[8px] !border-[#1A73E8]  !border-[0px] !border-none' >
                <AccordionTrigger className='bg-[#1A73E8] hover:bg-[#1b66d2] text-white rounded-[8px] !border-[#1A73E8] !border-[0px] !border-none'>
                  <div className=' w-full flex flex-col text-left gap-2 pl-[10px] py-[5px]'>
                    <h1 className='text-[1.2rem] font-[600]'>Therapy with Special Doctor</h1>
                    <h3 className='opacity-[0.6] text-[0.83rem] font-[4=500]'>7:00PM - 8:00PM</h3>
                  </div>
                </AccordionTrigger>
                <AccordionContent className=' w-full rounded-[8px] py-[15px] px-[8px] bprder-[2px] accor-content '>
                  <div className='px-[10px] py-[16px] flex justify-end items-center gap-3'>
                    <Button className='h-[30px] flex justify-center items-center' onClick={(e) => {
                      e.preventDefault()

                    }}>info</Button>
                    <Button className='h-[30px] flex justify-center items-center' onClick={(e) => {
                      e.preventDefault()

                    }}>Cancel</Button>
                    <Button onClick={(e) => {
                      e.preventDefault()
                      console.log("MEOW")
                    }} className='bg-[#1A73E8] hover:bg-[#1b66d2] h-[30px] flex justify-center items-center' >Join</Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
              {
                finalApp.today && finalApp.today.length !== 0 && finalApp.today.map((item: any, idx: number) => {
                  if (idx === 0) {
                    <AccordionItem value="item-1" className='w-[80%] text-white rounded-[8px] !border-[#1A73E8]  !border-[0px] !border-none' >
                      <AccordionTrigger className='bg-[#1A73E8] hover:bg-[#1b66d2] text-white rounded-[8px] !border-[#1A73E8] !border-[0px] !border-none'>
                        <div className=' w-full flex flex-col text-left gap-2 pl-[10px] py-[5px]'>
                          <h1 className='text-[1.2rem] font-[600]'>{item.name}</h1>
                          <h3 className='opacity-[0.6] text-[0.8rem] font-[4=500]'>`${dateFormatting(item.startTime)} - ${dateFormatting(item.endTime)}`</h3>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className=' w-full rounded-[8px] py-[15px] px-[8px] bprder-[2px] accor-content '>
                        <div className='px-[10px] py-[16px] flex justify-end items-center gap-3'>
                          <Button className='h-[30px] flex justify-center items-center' onClick={(e) => {
                            e.preventDefault()

                          }}>info</Button>
                          <Button className='h-[30px] flex justify-center items-center' onClick={(e) => {
                            e.preventDefault()

                          }}>Cancel</Button>
                          <Button onClick={(e) => {
                            e.preventDefault()
                            console.log("MEOW")
                          }} className='bg-[#1A73E8] hover:bg-[#1b66d2] h-[30px] flex justify-center items-center' >Join</Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  } else {
                    return (
                      <AccordionItem value="item-1" className='text-white rounded-[8px]  !border-[0px] !border-none' >
                        <AccordionTrigger className='bg-[] hover:bg-[] text-white rounded-[8px] !border-[] !border-[0px] !border-none'>
                          <div className=' w-full flex flex-col text-left gap-2 pl-[10px] py-[5px]'>
                            <h1 className='text-[1.3rem] font-[600]'>{item.name}</h1>
                            <h3 className='opacity-[0.6] text-[0.83rem] font-[4=500]'>`${dateFormatting(item.startTime)} - ${dateFormatting(item.endTime)}`</h3>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className=' w-full rounded-[8px] py-[15px] px-[8px] bprder-[2px] accor-content '>
                          <div className='px-[10px] py-[16px] flex justify-end items-center gap-3'>
                            <Button className='h-[30px] flex justify-center items-center' onClick={(e) => {
                              e.preventDefault()

                            }}>info</Button>
                            <Button className='h-[30px] flex justify-center items-center' onClick={(e) => {
                              e.preventDefault()

                            }}>Cancel</Button>
                            <Button onClick={(e) => {
                              e.preventDefault()
                              console.log("MEOW")
                            }} className='bg-[] hover:bg-[] h-[30px] flex justify-center items-center' >Join</Button>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    )
                  }
                }
                )
              }
            </Accordion>
          </div>
        </div>

        <div className='w-[2px] min-h-[90%] h-auto bg-white rounded-[3px]'>
        </div>

        <div className='w-[50%] h-auto flex justify-center items-center '>
          {/* <h1 className='text-[1.8rem] font-[560] w-[80%] text-center'>Book A Appointment</h1> */}
          <Card className="w-[400px] min-h-[450px] border-[3px] border-white bg-transparent ">
            <CardHeader>
              <CardTitle className='!text-white'>Book A Appointment</CardTitle>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">

                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="framework" className='!text-white'>Choose a Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          className='outline-none border-[1px] border-white w-[240px] bg-transparent !text-white justify-start text-left font-normal flex gap-2 items-center px-[13px] py-[4px] rounded-[6px] text-[0.9rem]'
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar 
                          className='bg-transparent border-[1px] border-white'
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className='flex space-y-1.5 flex-col'>
                    <div className='flex flex-col space-y-1.5'>
                      <Label htmlFor="name" className='text-white'>Start Time</Label>
                      <Select value={startTime} onValueChange={(change) => {
                        setStartTime(change)
                      }}>
                        <SelectTrigger className="w-[180px] flex items-center gap-1 text-white">
                          <Timer className='opacity-[1]' color='white' size={20} />
                          <SelectValue placeholder="Select a Time" className='!text-white' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup className='max-h-[280px]' >
                            {Time.map((item, idx) => (
                              <SelectItem key={idx} value={item.value}>{item.title}</SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>


                  <div className='flex space-y-1.5 flex-col'>
                    <div className='flex flex-col space-y-1.5'>
                      <Label htmlFor="name" className='text-white'>Select Therapist</Label>
                      <Select value={startTime} onValueChange={(change) => {
                        setStartTime(change)
                      }}>
                        <SelectTrigger className="w-[180px] flex items-center gap-1 text-white">
                          <Timer className='opacity-[1]' color='white' size={20} />
                          <SelectValue placeholder="Select a Time" className='!text-white' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup className='max-h-[200px]' >
                            {Time.map((item, idx) => (
                              <SelectItem  key={idx} value={item.value}>{item.title}</SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>




                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button className='bg-[#1A73E8] hover:bg-[#1b66d2]'>Submit</Button>
            </CardFooter>
          </Card>


        </div>

      </div>
    </div>
  )
}

export default Page