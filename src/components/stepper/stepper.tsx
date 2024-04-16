"use client"
import style from './stepper.module.css';
import { useEffect, useState } from 'react';
import {  StepStatus, Step} from '@/cores/stepper/stepper.interface';
import { DEFAULT_STEPS } from '@/cores/stepper/stepper.constant';
import React from 'react';
import { formatDate, formatDateToLocal } from '@/utils/date.utils';
import IconChecked from '../shared/icons/iconChecked';
import IconNotChecked from '../shared/icons/iconNotChecked';
import IconCheckNeutral from '../shared/icons/iconCheckNeutral';
import { ApplicationStatus, statusList } from '@/cores/constant/constant.application';
import IconDisable from '../shared/icons/iconDisable';
import { title } from 'process';


const Stepper  = ({ application, history } : any) => {

    const [applicationStep, setApplicationStep] = useState<Step[]>([]);
    const [isRefused, setIsRefused] = useState<boolean>(false);

    const SetStepStatus = (updatedAtHistory: any, step: Step) => {
        const stepStatus = statusList.find(s_status => (s_status.value === application.applicationStatus));
        if (stepStatus?.label != statusList[6].label) {
            if (stepStatus?.label === updatedAtHistory.action.proof) {
                return StepStatus.CHECKING;
            } else {
                return StepStatus.CHECKED
            }
        } else {
            if(step.applicationStatus.label === history[1].action.proof) {
                setIsRefused(true)
                return StepStatus.REFUSED;
            }
            return StepStatus.CHECKED;
        }
    }

    const setStypeByHistory = (step: Step): Step => {
        const updatedAtHistory = history.find((hist: any) => hist.action.proof === step.applicationStatus.label);
        return  updatedAtHistory? {
            ...step,
            date: formatDateToLocal(updatedAtHistory.createdAt),
            status: SetStepStatus(updatedAtHistory, step)
        } : {
            ...step,
            status: StepStatus.NOT_CHECKED
        }
    }
    
    useEffect(() => { 
        console.log(history)
        let steps = DEFAULT_STEPS.map((step, index) => {
            if (application && index === 0) {
                return {
                    ...step,
                    date : formatDateToLocal(application.createdAt),
                    status: StepStatus.CHECKED,
                }
            }
            return setStypeByHistory(step)
        });
        setApplicationStep(steps)

    }, [application, history]);    

    return (
        <div className={style.container}>
            <div className={style.steps}>
                {
                    applicationStep?.map((step, index) =>
                        <React.Fragment key={`steps${index}`}>
                            <div className={style.wrapper}>
                                <div className={`${style.step}`}>
                                    {
                                     step.status === StepStatus.CHECKED ? <IconChecked />
                                    : (isRefused && step.status === StepStatus.REFUSED) ? <IconDisable width={25} height={25} />
                                    : step.status === StepStatus.NOT_CHECKED ? <IconNotChecked />
                                    : <IconCheckNeutral />
                                    }
                                </div>
                            </div>
                            {index < 5 && <div className={style.line}></div>}
                        </React.Fragment>
                    )
                }

            </div>
            <div className={style.labelWrapper}>
                {
                    applicationStep?.map((step, index) => 
                        <React.Fragment key={`label${index}`}>
                            <div className={style.wrapper}>
                                <p style={step.status === StepStatus.REFUSED && isRefused ? {color:"red"} : {}} className={`${step.status === StepStatus.CHECKING && isRefused ? style.labelChecked : (step.status === StepStatus.CHECKING) ? style.labelChecked : style.title}`}>
                                    {step.label}
                                </p>
                                <p className={style.stepDate}>{step.date}</p>
                            </div>
                        </React.Fragment>
                    )
                }
            </div>
        </div>
    )    
}

export default Stepper;
