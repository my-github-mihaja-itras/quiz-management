import React from 'react';
import style from './profie.status.module.css';
import { ApplicationStatus } from '@/cores/constant/constant.application';
import { APPLICATION_STATUS_LABELS } from '@/components/dashboard/constants';
import { APPLICATION_STATUS_COLOR } from '@/cores/stepper/stepper.interface';

const StatusIndicator = ({status} : any) => {

    const statusLabel = APPLICATION_STATUS_LABELS;
    const color = APPLICATION_STATUS_COLOR

    return (
        <div className={style.container}>
            <div className={style.contentWraper} >
                <div className={style.dot} style={{backgroundColor: color[status as keyof typeof ApplicationStatus]}}></div>
                <div className={style.label} style={{color: color[status as keyof typeof ApplicationStatus]}}>
                    {statusLabel[status as keyof typeof ApplicationStatus]}
                </div>
            </div>
        </div>
    );
};

export default StatusIndicator;