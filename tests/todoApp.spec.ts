import {expect, test} from '../fixtures/page-object-fixtures'

test.describe('Todo Tests', async () => {
  
  test.beforeEach(async({page}) => {
    await page.goto('frontend/project-6')
  })

  test('Test Case 01 - Todo-App Modal Verification', async ({ todoPage}) => {
      await expect(todoPage.panelModal).toContainText('My Tasks')
      await expect(todoPage.addBtn).toBeEnabled()
      await expect(todoPage.search).toBeEnabled()
      await expect(todoPage.todoItem).toHaveText('No task found!')
  })

  test('Test Case 02: Single Task Addition and Removal', async ({ todoPage}) => {
     await todoPage.addTodo('Item 1')
     await expect(todoPage.todoItem).toHaveText('Item 1')
     await expect(todoPage.todoItem).toHaveCount(1)
     await todoPage.markComplete('Item 1')
     await expect(todoPage.lineThru).toHaveAttribute('style', 'text-decoration: line-through;')
     await todoPage.remove('Item 1')
     await expect(todoPage.todoItem).toHaveText('No task found!')
  })

  test('Test Case 03 - Multiple Task Operations', async ({ todoPage }) => {
    await todoPage.addMany(5)

    const items = await todoPage.lineThru.count()
    const itemsArr = []
    for(let i = 1; i <= items; i++) {
      itemsArr.push(`Item ${i}`)
    }

    await expect(todoPage.lineThru).toHaveText(itemsArr)
    await todoPage.markAllComplete(items)
    await todoPage.clear.click()
    await expect(todoPage.todoItem).toHaveText('No task found!')
  })

  test('Test Case 04 - Search and Filter Functionality in todo App', async ({ todoPage }) => {
    await todoPage.addMany(5)

    const items = await todoPage.lineThru.count()
    const itemsArr = []
    for(let i = 1; i <= items; i++) {
      itemsArr.push(`Item ${i}`)
    }

    await expect(todoPage.lineThru).toHaveText(itemsArr)
    await todoPage.searchItem('Item 1')
    await expect(todoPage.todoItem).toHaveCount(1)
  })

  test('Test Case 05 - Task Validation and Error Handling', async ({ todoPage }) => {
    await todoPage.addTodo('')
    await expect(todoPage.todoItem).toHaveText('No task found!')

    await todoPage.addTodo(Array(35).join('x'))
    await expect(todoPage.charError).toHaveText('Error: Todo cannot be more than 30 characters!')
    await todoPage.addTodo('Item 1')
    await expect(todoPage.todoItem).toHaveCount(1)
    await todoPage.addTodo('Item 1')
    const ite = await todoPage.lineThru.textContent()
    await expect(todoPage.charError).toHaveText(`Error: You already have ${ite} in your todo list.`)
  })
     
})

