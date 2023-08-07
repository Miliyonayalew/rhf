import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { DevTool } from '@hookform/devtools'

  const schema = z.object({
    username: z.string().nonempty("Username is required"),
    email: z.string().nonempty("Email is required").email("Email is invalid"),
    channel: z.string().nonempty("Channel is required"),
  })

  type FormValues = {
    username: string,
    email: string,
    channel: string,
  }

  export const ZodIntegration = () => {
    const form = useForm<FormValues>({
      defaultValues: {
        username: "",
        email: "",
        channel: "",
      },
      resolver: zodResolver(schema)
    })

    const { register, control, handleSubmit, formState } = form
    const { errors } = formState

    const onSubmit = (data: FormValues) =>{
      console.log("Submitted", data)
    }

    return (
      <div className="flex flex-col">
        <h1 className="text-white text-lg center m-3">Zod Youtube Form</h1>
        <form 
          className="flex flex-col " 
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="mb-3 flex flex-col gap-2 justify-center items-start">
            <label className="text-white text-lg" htmlFor="username">Username</label>
            <input 
              className="rounded p-1 focus:outline-none focus:ring focus:border-blue-500" 
              type="text" 
              id="username" 
              {...register("username")} 

            />
            <p className="text-red-400 text-sm-start ">{errors.username?.message}</p>
          </div>
          
          <div className="mb-3 flex flex-col gap-2 justify-center items-start">
            <label className="text-white text-lg" htmlFor="email">Email</label>
            <input 
              className="rounded p-1 focus:outline-none focus:ring focus:border-blue-500" 
              type="text" 
              id="email" 
              {...register("email")}/>
            <p className="text-red-400 text-sm-start ">{errors.email?.message}</p>
          </div>
        
          <div className="mb-3 flex flex-col gap-2 justify-center items-start">
            <label className="text-white text-lg" htmlFor="channel">Channel</label>
            <input 
              className="rounded p-1 focus:outline-none focus:ring focus:border-blue-500" 
              type="text" 
              id="channel" 
              {...register("channel")}
            />
            <p className="text-red-400 text-sm-start ">{errors.channel?.message}</p>
          </div>


          <div className="flex gap-2">
            <button className="bg-blue-600 text-white hover:bg-blue-700" >Submit</button>
          </div>
        </form>
        <DevTool control={control}/>
      </div>
    )
  }
