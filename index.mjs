import { Client, logger, Variables, File } from "camunda-external-task-client-js";

// configuration for the Client
const config = {
  baseUrl: "http://localhost:8080/engine-rest",
  use: logger,
};

// set up client
const client = new Client(config);

// dummy data
const diseaseList = {
  'flu' : 1,
  'fever' : 2,
  'diarrhea' : 3,
  'headache' : 4,
  'stomachache' : 5,
  'cancer' : 6,
};

const medicineList = {
  'sanmol' : 1,
  'ultraflu' : 2,
  'diapet' : 3,
  'bodrex' : 4,
  'polysilane' : 5,
  'tolak angin' : 6,
};

// susbscribe to the topic: 'ambilAntrian'
client.subscribe("ambilAntrian", async ({ task, taskService }) => {
  // set waitingList
  const defaultWaitingList = task.variables.get("defaultWaitingList");

  const processVariables = new Variables().set("waitingList", defaultWaitingList + 1);

  try {
    await taskService.complete(task, processVariables);
  } catch (e) {
    console.error(`Failed completing task, ${e}`);
  }
});

// susbscribe to the topic: 'notaKonsultasi'
client.subscribe("notaKonsultasi", async ({ task, taskService }) => {
  const diagnosis = diseaseList[task.variables.get("diagnosis")];
  const prescription = medicineList[task.variables.get("prescription")];

  const processVariables = new Variables()
  .set("nota", parseInt(prescription*50000));

  try {
    await taskService.complete(task, processVariables);
  } catch (e) {
    console.error(`Failed completing task, ${e}`);
  }
});