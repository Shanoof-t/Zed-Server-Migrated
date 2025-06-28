import UserConsumer from "./userConsumer";

export default async function runConsumers(){
    await UserConsumer()
}