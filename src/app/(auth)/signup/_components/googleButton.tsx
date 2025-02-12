import React from 'react'

import { CalendarOAuth } from '../actions';

export default function GoogleButton() {
  return (
    <div className="flex items-center justify-center">
        <button onClick={() => {CalendarOAuth}} className="px-4 py-2 border flex gap-2 rounded-2xl bg-black dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
            <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"/>
            <span className=''>Connect</span>
        </button>
    </div>
  );
}
