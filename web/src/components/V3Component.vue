<template>
  <div>
    <h2>Todo List</h2>
    <fieldset>
      <ul>
        <li v-for="list in todoList" :key="list.id">{{list.title}}</li>
      </ul>
    </fieldset>
    <input type="button" @click="showAllList" value="show all todo list" />
    <hr />
    <input type="text" v-model="newListInput" />
    <input type="button" @click="addToList" value="add to list" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

interface TodoList {
  id: number;
  title: string;
  complete?: boolean;
}

const dummyList: TodoList[] = [
  {
    id: 1,
    title: "halo dunia",
  },
  {
    id: 2,
    title: "helo world",
    complete: true,
  },
  {
    id: 3,
    title: "halo akhirat",
  },
];

export default defineComponent({
  setup() {
    const todoList = ref<TodoList[] | []>([]);
    const newListInput = ref<string>("");

    const showAllList = (): void => {
      todoList.value = dummyList;
    };

    const addToList = (): void => {
      todoList.value.push({
        id: 1,
        title: newListInput.value,
      } as never);
    };

    return {
      todoList,
      showAllList,
      newListInput,
      addToList,
    };
  },
});
</script>
