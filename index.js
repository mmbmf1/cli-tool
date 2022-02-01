#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';


let playerName

const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms))

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow('Who Wants to be a Javascript Millionaire? \n') 

    await sleep()
    rainbowTitle.stop()

    console.log(`
    ${chalk.bgBlue('HOW TO PLAY')} 
    I am a process on your computer.
    If you get any question wrong I will be ${chalk.bgRed('killed')}
    So get all the questions right...
  `);
}

async function askName() {
  const answer = await inquirer.prompt({
    name: 'player_name',
    type: 'input',
    message: 'What is your name',
    default() {
      return 'Player'
    }
  })

  playerName = answer.player_name
}

async function question1() {
  const answer = await inquirer.prompt({
    name: 'question_1',
    type: 'list',
    message: 'The capital of Missouri is \n',
    choices: [
      'St. Louis',
      'Kansas City',
      'Jefferson City',
      'Springfield'
    ]
  })

  return handleAnswer(answer.question_1 == 'Jefferson City')
}

async function question2() {
  const answer = await inquirer.prompt({
    name: 'question_2',
    type: 'list',
    message: ` What movie star and St. Louis native owns a local restaurant called O'Leary's? \n`,
    choices: [
      'Jon Cusack',
      'Brad Pitt',
      'John Goodman',
      'Nelly',
      'Cornell Haynes Jr.'
    ]
  })

  return handleAnswer(answer.question_2 == 'John Goodman')
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner('Checking answer...').start()
  await sleep()

  if (isCorrect) {
    spinner.success({text: `Nice work ${playerName}.`})
  } else {
    spinner.error({ text: `Game over, you lose ${playerName}` })
    process.exit(1)
  }
}

async function winner() {
  console.clear()
  const message = `Congrats , ${playerName} \n $ 1 , 0 0 0 , 0 0 0 . 0 0`

  figlet(message, (err, data) => {
    console.log(gradient.pastel.multiline(data))
    if (err) {
      console.log(err)
    }
  })
}

// top level await -> use await outside of an async function because node-js supports 
await welcome()
await askName()
await question1()
await question2()
// more questions
await winner()