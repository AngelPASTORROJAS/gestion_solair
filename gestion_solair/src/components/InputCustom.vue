<template>
    <div class="row q-pa-xs">
        <q-field bg-color="primary" class="col-2 label" square outlined stack-label>
            <template v-slot:control>
                <div class="text-white">{{ label }}</div>
            </template>
        </q-field>
        <q-input class="col-10 input"
            filled clearable
            bg-color="white" 
            :placeholder="mention"
            :model-value="model"
            :maxlength="max"
            :rules="rules"
            @update:mentionStack="updateMention"
            @update:modelValue="updateValue"
            :counter="max?true:false"
        ></q-input>
    </div>
</template>

<script lang="ts">
import { defineComponent, toRef } from 'vue';
export default defineComponent({
    name: 'InputCustom',
    emits: ['update:modelValue', 'update:mention'],
    props: {
        mention: { type: String, required: false },
        max: { type: String, required: false },
        rules: { type: Array, required: false },
        label: { type: String, required: true, default: '' },
        modelValue: { type: String, required: false },
        readonly: { type: Boolean, required: false, default: false },
    },
    setup(props, { emit }) {
        const model = toRef(props, 'modelValue');
        const updateValue = (newValue: string) => { emit('update:modelValue', newValue); };
        const mentionStack = toRef(props, 'mention');
        const updateMention = (newMention: string) => { emit('update:modelValue', newMention); };

        return {
            model,
            updateValue,
            mentionStack,
            updateMention
        };
    }
});
</script>