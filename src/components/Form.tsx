import { useEffect } from 'react'
import { useForm, useFieldArray, FieldErrors } from "react-hook-form"
import { DevTool } from '@hookform/devtools'

  type FormValues = {
    username: string,
    email: string,
    channel: string,
    social: {
      facebook: string,
      twitter: string
    };
    phoneNumbers: string[];
    phNumbers: {
      number: string
    }[];
    age: 0;
    dob: Date
  }

  let render = 0
  export const Form = () => {
    const form = useForm<FormValues>({
      defaultValues: {
        username: "",
        email: "",
        channel: "",
        social: {
          facebook: "CodeEvo",
          twitter: "CodeEv"
        },
        phoneNumbers: ["", ""],
        phNumbers: [{ number: "" }],
        age: 0,
        dob: new Date()
      },
      mode: "onBlur" //all onChange onSubmit 
    })

    const { register, control, handleSubmit, formState, getValues, setValue,watch, reset} = form
    const { errors, isDirty, isValid, isSubmitSuccessful, isSubmitted } = formState

    //console.log(isSubmitted)

    const {fields, append, remove } = useFieldArray({
      name: "phNumbers",
      control,
    })



    useEffect (() => {
      if(isSubmitSuccessful){
        reset()
      }
    },[isSubmitSuccessful, reset])
    const onSubmit = (data: FormValues) =>{
      console.log("Submitted", data)
    }

    const onError = (errors: FieldErrors<FormValues>) => {
      console.log("Form errors", errors)
    }

    const handleGetValue = () => {
      console.log("Get Values",getValues(["username"]))
    }

    const handleSetValue = () => {
      setValue("username", "")
    }

    render++
    return (
      <div className="flex flex-col">
        <h1 className="text-white text-lg">Form  ({render / 2})</h1>
        <form 
          className="flex flex-col " 
          onSubmit={handleSubmit(onSubmit, onError)}
          noValidate
        >
          <div className="mb-3 flex flex-col gap-2 justify-center items-start">
            <label className="text-white text-lg" htmlFor="username">Username</label>
            <input 
              className="rounded p-1 focus:outline-none focus:ring focus:border-blue-500" 
              type="text" 
              id="username" 
              {...register("username", {required: 'Username is required'})} 

            />
            <p className="text-red-400 text-sm-start ">{errors.username?.message}</p>
          </div>
          
          <div className="mb-3 flex flex-col gap-2 justify-center items-start">
            <label className="text-white text-lg" htmlFor="email">Email</label>
            <input 
              className="rounded p-1 focus:outline-none focus:ring focus:border-blue-500" 
              type="text" 
              id="email" 
              {...register("email", {
                pattern: {
                  value: 
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: "Invalid email address",
                },
                validate:{
                  notadmin: (fieldValue) => {
                    return (
                      fieldValue !== "admin@example.com" || 
                      "Enter different email"
                      )
                  },
                  endswith: (fieldValue) => {
                    return (
                      !fieldValue.endsWith("baddomain.com") ||
                      "This domain is not supported"
                    )
                  }
                }
              })}/>
            <p className="text-red-400 text-sm-start ">{errors.email?.message}</p>
          </div>
        
          <div className="mb-3 flex flex-col gap-2 justify-center items-start">
            <label className="text-white text-lg" htmlFor="channel">Channel</label>
            <input 
              className="rounded p-1 focus:outline-none focus:ring focus:border-blue-500" 
              type="text" 
              id="channel" 
              {...register("channel", {required: 'Channel is required'})}
            />
            <p className="text-red-400 text-sm-start ">{errors.channel?.message}</p>
          </div>

          <div className="mb-3 flex flex-col gap-2 justify-center items-start">
            <label className="text-white text-lg" htmlFor="facebook">Facebook</label>
            <input 
              className="rounded p-1 focus:outline-none focus:ring focus:border-blue-500" 
              type="text" 
              id="facebook" 
              {...register("social.facebook")}
            />
          </div>

          <div className="mb-3 flex flex-col gap-2 justify-center items-start">
            <label className="text-white text-lg" htmlFor="twitter">Twitter</label>
            <input 
              className="rounded p-1 focus:outline-none focus:ring focus:border-blue-500" 
              type="text" 
              id="twitter"
              {...register("social.twitter", {required: "Twitter is required"})}
            />
            <p className="text-red-400 text-sm-start ">{errors.social?.twitter?.message}</p>
          </div>

          <div className="mb-3 flex flex-col gap-2 justify-center items-start">
            <label className="text-white text-lg" htmlFor="primary-phone">Primary</label>
            <input 
              className="rounded p-1 focus:outline-none focus:ring focus:border-blue-500" 
              type="text" 
              id="primary" 
              {...register("phoneNumbers.0", {required: "Primary phone is required"})}
            />
            <p className="text-red-400 text-sm-start ">{errors.phoneNumbers?.[0]?.message}</p>
          </div>

          <div className="mb-3 flex flex-col gap-2 justify-center items-start">
            <label className="text-white text-lg" htmlFor="secondary-phone">Secondary</label>
            <input 
              className="rounded p-1 focus:outline-none focus:ring focus:border-blue-500" 
              type="text" 
              id="secondary" 
              {...register("phoneNumbers.1", {required: "Secondary phone is required"})}
            />
            <p className="text-red-400 text-sm-start ">{errors.phoneNumbers?.[1]?.message}</p>
          </div>

          <div>
            <label className="text-white text-lg">List of phone Numbers</label>
            {
              fields.map((field, index) =>{
                return (
                  <div className="mb-3 flex flex-col gap-2 justify-center items-start" key={field.id}>
                    <input
                    className="rounded p-1 focus:outline-none focus:ring focus:border-blue-500" 
                    type="text"
                    {...register(`phNumbers.${index}.number` as const)}
                    />
                    {index > 0 && (
                      <button type="button" onClick={()=> remove(index)}>X</button>
                    )}
                    
                  </div>
                )
              })
            }
            <button type="button" onClick={()=> append({number: ""})}>
              Add Phone Number
            </button>
          </div>

          <div className="mb-3 flex flex-col gap-2 justify-center items-start">
            <label className="text-white text-lg" htmlFor="age">Age</label>
            <input 
              className="rounded p-1 focus:outline-none focus:ring focus:border-blue-500" 
              type="number" 
              id="age" 
              {...register("age",
              {
                valueAsNumber: true,
                required: {
                  value: true,
                  message: 'Age is required'}
              })
              }
            />
            <p className="text-red-400 text-sm-start ">{errors.age?.message}</p>
          </div>

          <div className="mb-3 flex flex-col gap-2 justify-center items-start">
            <label className="text-white text-lg" htmlFor="dob">dob</label>
            <input 
              className="rounded p-1 focus:outline-none focus:ring focus:border-blue-500" 
              type="date" 
              id="dob" 
              {...register("dob",
              {
                valueAsDate: true,
                required: {
                  value: true,
                  message: 'Date of birth is required'}
              })
              }
            />
            <p className="text-red-400 text-sm-start ">{errors.dob?.message}</p>
          </div>


          <div className="flex gap-2">
            <button className="bg-blue-600 text-white hover:bg-blue-700" disabled={!isDirty || !isValid}>Submit</button>
            <button className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => reset()}>Reset</button>
            <button className="bg-blue-600 text-white hover:bg-blue-700" onClick={handleSetValue}>Set Value</button>
            <button className="bg-blue-600 text-white hover:bg-blue-700" onClick={handleGetValue}>Get Value</button>
          </div>
        </form>
        <DevTool control={control}/>
      </div>
    )
  }
