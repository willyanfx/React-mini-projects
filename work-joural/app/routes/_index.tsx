import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Work Journal" },
    { name: "description", content: "Welcome to Work Journal!" },
  ];
};

const options = [
  { name: "category", value: "work" },
  { name: "category", value: "learning" },
  { name: "category", value: "leisure" },
];

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  console.log(Object.fromEntries(formData));
  return null;
}

export default function Index() {
  return (
    <div className='p-10'>
      <h1 className='text-5xl'>Work Journal</h1>
      <p>Learning and doing. Update weekly.</p>

      <div className='my-8 border p-3'>
        <Form method='POST'>
          <p className='italic'>Create an entry</p>
          <div className=''>
            <div className='mt-4'>
              <input type='date' name='date' className='text-gray-600' />
            </div>
            <div className='mt-4 space-x-6'>
              {options.map((option, index) => (
                <label key={`${index}-${option.value}`} className='capitalize'>
                  <input
                    className='mr-1'
                    type='radio'
                    name={`${option.name}`}
                    value={`${option.value}`}
                    checked
                  />
                  {option.value}
                </label>
              ))}
            </div>
            <div className='mt-2'>
              <textarea
                name='text'
                className='w-full text-gray-700'
                rows={3}
                placeholder='write your entry'
              />
            </div>
            <div className='mt-1 text-right'>
              <button
                className='bg-blue-500 text-white font-medium px-4 py-1'
                type='submit'
              >
                Save
              </button>
            </div>
          </div>
        </Form>
      </div>

      <div className='mt-6'>
        <p className='font-bold'>
          Week of February 20<sup>th</sup>
        </p>
        <div className='mt-3 space-y-4'>
          <div>
            <p>Work</p>
            <ul className='list-disc ml-8'>
              <li>First item</li>
              <li>Second Item</li>
            </ul>
          </div>
          <div>
            <p>Learnings</p>
            <ul className='list-disc ml-8'>
              <li>First item</li>
              <li>Second Item</li>
            </ul>
          </div>
          <div>
            <p>Interesting thing</p>
            <ul className='list-disc ml-8'>
              <li>First item</li>
              <li>Second Item</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
