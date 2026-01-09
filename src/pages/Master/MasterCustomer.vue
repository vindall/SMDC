<template>
  <div class="bg-white">
    <header>
      <div class="row q-mb-md q-px-xl">
        <div class="column q-pt-lg">
          <div class="text-grey-8">Dashboard / Master Data</div>
          <div class="text-h6 text-weight-medium">Master Customer</div>
        </div>
        <q-space></q-space>
        <div class="row q-pt-lg">
          <q-btn
            class="q-px-md bg-white text-black q-mr-md"
            dense
            flat
            style="border-radius: 15px; border: 1px solid #ccc"
            @click="console.log('a')"
          >
            <q-icon name="filter_list" size="md" class="q-mr-sm" />
            <div class="text-weight-medium">Advanced Filter</div>
          </q-btn>
          <q-btn
            class="q-px-md bg-black text-white"
            dense
            flat
            style="border-radius: 15px"
            @click="newCustomerDialog = true"
          >
            <q-icon name="add" size="md" class="q-mr-sm" />
            <div class="text-weight-medium">Add Customer</div>
          </q-btn>
        </div>
      </div>
    </header>
    <q-separator></q-separator>
    <div class="row justify-between bg-white q-mt-lg q-mx-xl">
      <div style="width: 24%">
        <div
          class="row bg-white"
          style="
            border: 1px solid #ccc;
            border-radius: 15px;
            width: 100%;
            height: 90px;
          "
        >
          <div class="justify-center items-center row q-px-sm q-mr-lg">
            <div class="bg-grey-3 q-pa-sm" style="border-radius: 15px">
              <q-icon name="apartment" size="md" />
            </div>
          </div>
          <div class="column justify-center">
            <div class="text-weight-medium text-grey-8">Total Customer</div>
            <div class="text-h5 text-weight-bold">5</div>
          </div>
        </div>
      </div>
      <div style="width: 24%">
        <div
          class="row bg-white"
          style="
            border: 1px solid #ccc;
            border-radius: 15px;
            width: 100%;
            height: 90px;
          "
        >
          <div class="justify-center items-center row q-px-sm q-mr-lg">
            <div
              class="bg-green-1 text-green q-pa-sm"
              style="border-radius: 15px"
            >
              <q-icon name="check_circle" size="md" />
            </div>
          </div>
          <div class="column justify-center">
            <div class="text-weight-medium text-grey-8">Active</div>
            <div class="text-h5 text-weight-bold">5</div>
          </div>
        </div>
      </div>
      <div style="width: 24%">
        <div
          class="row bg-white"
          style="
            border: 1px solid #ccc;
            border-radius: 15px;
            width: 100%;
            height: 90px;
          "
        >
          <div class="justify-center items-center row q-px-sm q-mr-lg">
            <div class="bg-red-1 text-red q-pa-sm" style="border-radius: 15px">
              <q-icon name="cancel" size="md" />
            </div>
          </div>
          <div class="column justify-center">
            <div class="text-weight-medium text-grey-8">Inactive</div>
            <div class="text-h5 text-weight-bold">5</div>
          </div>
        </div>
      </div>
      <div style="width: 24%">
        <div
          class="row bg-white"
          style="
            border: 1px solid #ccc;
            border-radius: 15px;
            width: 100%;
            height: 90px;
          "
        >
          <div class="justify-center items-center row q-px-sm q-mr-lg">
            <div
              class="bg-orange-1 q-pa-sm text-orange"
              style="border-radius: 15px"
            >
              <q-icon name="group_add" size="md" />
            </div>
          </div>
          <div class="column justify-center">
            <div class="text-weight-medium text-grey-8">Not yet Assigned</div>
            <div class="text-h5 text-weight-bold">5</div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="row q-mx-xl q-mt-lg"
      style="border: 1px solid #ccc; border-radius: 15px"
    >
      <q-input
        color="black"
        v-model="searchModel"
        dense
        placeholder="Search Customer"
        class="q-ma-md my-custom-input"
        outlined
        style="width: 30%"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
      <q-select
        :options="salesOptions"
        v-model="searchSalesModel"
        option-value="sales_id"
        option-label="sales_name"
        clearable
        dense
        outlined
        label="Sales"
        class="q-my-md q-mr-md my-custom-input"
        style="width: 15%"
      ></q-select>
      <q-select
        :options="filterModeOptions"
        v-model="filterModeModel"
        dense
        outlined
        label="All Activity"
        class="q-my-md q-mr-md my-custom-input"
        style="width: 15%"
      ></q-select>
      <q-space></q-space>
      <div class="row items-center q-mr-md">
        <div
          style="border: 1px solid #ccc; border-radius: 15px"
          class="q-pa-xs"
        >
          <q-btn
            flat
            style="border-radius: 10px"
            :class="
              filterButtonModel === 'All'
                ? 'bg-black text-white'
                : 'bg-white text-black'
            "
            @click="filterButtonModel = 'All'"
            >All</q-btn
          >
          <q-btn
            flat
            style="border-radius: 10px"
            :class="
              filterButtonModel === 'Active'
                ? 'bg-black text-white'
                : 'bg-white text-black'
            "
            @click="filterButtonModel = 'Active'"
            >Active</q-btn
          >
          <q-btn
            flat
            style="border-radius: 10px"
            :class="
              filterButtonModel === 'Inactive'
                ? 'bg-black text-white'
                : 'bg-white text-black'
            "
            @click="filterButtonModel = 'Inactive'"
            >Inactive</q-btn
          >
        </div>
      </div>
    </div>
    <div
      class="q-mx-xl q-mt-lg q-pa-sm"
      style="border-radius: 15px; border: 1px solid #ccc; height: 60vh"
    >
      <q-table
        flat
        :rows="rows"
        :columns="columns"
        row-key="name"
        style="height: 100%"
        :rows-per-page-options="[15, 25, 50, 75, 100]"
      >
        <template v-slot:body-cell-customer_id="props">
          <q-td :props="props" class="text-weight-medium">
            {{ props.row.customer_id }}
          </q-td>
        </template>
        <template v-slot:body-cell-customer="props">
          <q-td :props="props">
            <div class="row">
              <div class="column justify-center q-mr-sm">
                <div
                  class="column q-py-sm q-px-xs bg-black text-white justify-center items-center"
                  style="border-radius: 15px"
                >
                  <q-icon name="apartment" size="sm" />
                </div>
              </div>
              <div class="column">
                <div class="text-weight-medium">
                  {{ props.row.customer_name }}
                </div>
                <div class="row text-grey-7">
                  <div class="q-mr-sm">
                    <q-icon name="mail" />
                  </div>
                  {{ props.row.customer_email }}
                </div>
                <div class="row text-grey-7">
                  <div class="q-mr-sm">
                    <q-icon name="phone" />
                  </div>
                  {{ props.row.customer_phone }}
                </div>
              </div>
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-customer_status="props">
          <q-td :props="props" class="text-weight-medium">
            <div
              :style="
                props.row.customer_status === 'Active'
                  ? 'width: fit-content; border-radius: 15px; border: 1px solid #48eb2f '
                  : 'width: fit-content; border-radius: 15px; border: 1px solid #eb2f2f '
              "
              :class="
                props.row.customer_status === 'Active'
                  ? 'bg-green-1 text-green text-weight-medium row items-center q-py-xs q-px-sm'
                  : 'bg-red-1 text-red text-weight-medium q-py-xs q-px-sm'
              "
            >
              <q-icon
                class="q-mr-sm"
                :name="
                  props.row.customer_status === 'Active' ? 'check' : 'close'
                "
              />
              {{ props.row.customer_status }}
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-customer_sales="props">
          <q-td :props="props" class="text-weight-medium">
            <div
              class="row"
              style="width: 15vw"
              v-if="props.row.customer_sales[0]"
            >
              <div
                v-for="sales in props.row.customer_sales"
                style="
                  width: fit-content;
                  border-radius: 15px;
                  border: 1px solid #2f4beb;
                "
                :class="'bg-blue-1 text-blue text-weight-medium row items-center q-py-xs q-px-sm q-mr-sm q-mb-sm'"
              >
                <q-icon class="q-mr-sm" name="group" />
                {{ sales.sales_name }}
              </div>
            </div>
            <div v-else class="text-weight-medium text-subtitle2 text-grey">
              Not Yet Assigned
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-last_activity="props">
          <q-td :props="props" class="text-weight-medium">
            <div>
              <div class="row items-center">
                <div
                  style="width: 10px; height: 10px; border-radius: 15px"
                  :class="
                    daysAgo(props.row.last_activity) <= 7
                      ? 'bg-green q-mr-sm'
                      : daysAgo(props.row.last_activity) <= 31
                      ? 'bg-orange q-mr-sm'
                      : 'bg-red q-mr-sm'
                  "
                ></div>
                {{ daysAgo(props.row.last_activity) }} Days Ago
              </div>
              <div class="row items-center text-grey">
                {{ formatDate(props.row.last_activity) }}
              </div>
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-button="props">
          <q-td :props="props" class="text-weight-medium">
            <div class="row justify-around">
              <q-btn
                icon="link"
                label="Detail"
                rounded
                outline
                class="q-mr-md q-mb-sm"
                @click="
                  selectedCustomer = props.row;
                  detailCustomerDialog = true;
                "
              >
              </q-btn>
              <q-btn
                :icon="
                  props.row.customer_status === 'Active' ? 'close' : 'check'
                "
                :label="
                  props.row.customer_status === 'Active'
                    ? 'Set Inactive'
                    : 'Set Active'
                "
                rounded
                outline
                class="q-mb-sm"
              >
              </q-btn>
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-action="props">
          <q-td :props="props" class="text-weight-medium">
            <q-btn icon="more_vert" rounded flat> </q-btn>
          </q-td>
        </template>
      </q-table>
      <q-dialog
        v-model="detailCustomerDialog"
        position="right"
        backdrop-filter="blur(4px)"
      >
        <div style="min-width: 10vw; border-radius: 15px" class="bg-white">
          <q-card-section>
            <header
              class="row q-px-md q-pt-md q-mb-sm justify-between items-center"
            >
              <div class="column">
                <div class="text-grey">Customer</div>
                <div class="text-h6 text-weight-medium">
                  {{ selectedCustomer.customer_name }}
                </div>
              </div>
              <q-btn icon="close" flat round dense v-close-popup />
            </header>
          </q-card-section>
          <q-separator></q-separator>
          <q-card-section style="height: 60vh" class="scroll">
            <div class="q-pa-md">
              <div
                class="column q-pa-md"
                style="border: 1px solid #ccc; border-radius: 15px"
              >
                <div class="row items-center justify-between">
                  <div class="column">
                    <div class="text-subtitle1 text-weight-medium">
                      {{ selectedCustomer.customer_name }}
                    </div>
                    <div>
                      Last Activity :
                      {{ formatDate(selectedCustomer.last_activity) }}
                    </div>
                  </div>
                  <div>
                    <div
                      :style="
                        selectedCustomer.customer_status === 'Active'
                          ? 'width: fit-content; border-radius: 15px; border: 1px solid #48eb2f '
                          : 'width: fit-content; border-radius: 15px; border: 1px solid #eb2f2f '
                      "
                      :class="
                        selectedCustomer.customer_status === 'Active'
                          ? 'bg-green-1 text-green text-weight-medium row items-center q-py-xs q-px-sm'
                          : 'bg-red-1 text-red text-weight-medium q-py-xs q-px-sm'
                      "
                    >
                      <q-icon
                        class="q-mr-sm"
                        :name="
                          selectedCustomer.customer_status === 'Active'
                            ? 'check'
                            : 'close'
                        "
                      />
                      {{ selectedCustomer.customer_status }}
                    </div>
                  </div>
                </div>
                <q-separator class="q-my-md"></q-separator>
                <div class="column">
                  <div class="row items-center q-mb-md">
                    <div
                      class="q-mr-md q-pa-sm bg-grey-3"
                      style="border-radius: 15px"
                    >
                      <q-icon name="mail" size="sm"></q-icon>
                    </div>
                    <div class="column">
                      <div class="text-grey-7">Email</div>
                      <div class="text-subtitle1">
                        {{ selectedCustomer.customer_email }}
                      </div>
                    </div>
                  </div>
                  <div class="row items-center q-mb-md">
                    <div
                      class="q-mr-md q-pa-sm bg-grey-3"
                      style="border-radius: 15px"
                    >
                      <q-icon name="phone" size="sm"></q-icon>
                    </div>
                    <div class="column">
                      <div class="text-grey-7">Phone</div>
                      <div class="text-subtitle1">
                        {{ selectedCustomer.customer_phone }}
                      </div>
                    </div>
                  </div>
                  <div class="row items-center q-mb-md">
                    <div
                      class="q-mr-md q-pa-sm bg-grey-3"
                      style="border-radius: 15px"
                    >
                      <q-icon name="location_on" size="sm"></q-icon>
                    </div>
                    <div class="column" style="max-width: 80%">
                      <div class="text-grey-7">Address</div>
                      <div class="text-subtitle1">
                        {{ selectedCustomer.customer_address }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="column q-pa-md q-mt-md"
                style="border: 1px solid #ccc; border-radius: 15px"
              >
                <div class="row items-center justify-between">
                  <div class="column">
                    <div class="text-subtitle1 text-weight-medium">
                      Assign Sales
                    </div>
                    <div class="text-caption">
                      Customer can appear in multiple sales
                    </div>
                  </div>
                  <div>
                    <q-btn
                      label="Modify Assign"
                      icon="person_add"
                      outline
                      rounded
                    ></q-btn>
                  </div>
                </div>
                <q-separator class="q-my-md"></q-separator>
                <div
                  v-if="selectedCustomer.customer_sales.length !== 0"
                  class="row"
                >
                  <div
                    v-for="sales in selectedCustomer.customer_sales"
                    style="
                      width: fit-content;
                      border-radius: 15px;
                      border: 1px solid #2f4beb;
                    "
                    :class="'bg-blue-1 text-blue text-weight-medium row items-center q-py-xs q-px-sm q-mr-sm q-my-sm'"
                  >
                    <q-icon class="q-mr-sm" name="group" />
                    {{ sales.sales_name }}
                  </div>
                </div>
                <div v-else class="text-h6 text-grey">
                  No Assigned Sales Yet
                </div>
              </div>
            </div>
          </q-card-section>
          <q-separator></q-separator>
          <q-card-section>
            <div>
              <div class="row items-center justify-between q-pa-md">
                <div class="text-weight-medium text-grey-7">
                  Customer ID: {{ selectedCustomer.customer_id }}
                </div>
                <div>
                  <q-btn
                    class="q-mr-md"
                    flat
                    style="border: 1px solid #ccc; border-radius: 10px"
                    @click="
                      editCustomerDialog = true;
                      console.log(selectedCustomer);
                    "
                  >
                    <q-icon name="edit" class="q-mr-sm" size="xs"></q-icon>
                    <div>Edit</div>
                  </q-btn>
                  <q-btn
                    class="q-mr-md"
                    flat
                    style="border: 1px solid #ccc; border-radius: 10px"
                    v-if="selectedCustomer.customer_status === 'Active'"
                  >
                    <q-icon name="close"> </q-icon>
                    <div>Set Inactive</div>
                  </q-btn>
                  <q-btn
                    class="q-mr-md"
                    flat
                    style="border: 1px solid #ccc; border-radius: 10px"
                    v-else
                  >
                    <q-icon name="check"> </q-icon>
                    <div>Set Active</div>
                  </q-btn>
                </div>
              </div>
            </div>
          </q-card-section>
        </div>
      </q-dialog>
      <q-dialog v-model="newCustomerDialog" backdrop-filter="blur(4px)">
        <div style="min-width: 35vw; border-radius: 15px" class="bg-white">
          <q-card-section>
            <header class="row q-px-md justify-between">
              <div class="column">
                <div class="text-grey-7">Master Customer</div>
                <div class="text-h6">Add Customer</div>
              </div>
              <q-btn icon="close" flat round dense v-close-popup />
            </header>
          </q-card-section>
          <q-separator></q-separator>
          <q-card-section style="max-height: 60vh" class="scroll">
            <div class="row justify-between">
              <div class="column q-px-md" style="width: 50%">
                <div class="q-mb-sm">Customer ID</div>
                <div>
                  <q-input
                    class="my-custom-input"
                    dense
                    outlined
                    type="text"
                    v-model="newCustomer.customer_id"
                    placeholder="Customer ID"
                  />
                </div>
              </div>
              <div class="column q-px-md" style="width: 50%">
                <div class="q-mb-sm">Last Activity</div>
                <div>
                  <q-input
                    outlined
                    class="my-custom-input"
                    dense
                    v-model="newCustomer.last_activity"
                    placeholder="yyyy/mm/dd"
                    mask="date"
                    :rules="['date']"
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date v-model="newCustomer.last_activity">
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>
            </div>
            <div class="row justify-between q-mb-md">
              <div class="column q-px-md" style="width: 100%">
                <div class="q-mb-sm">Customer Name</div>
                <div>
                  <q-input
                    class="my-custom-input"
                    outlined
                    dense
                    v-model="newCustomer.customer_name"
                    placeholder="Customer Name"
                  ></q-input>
                </div>
              </div>
            </div>
            <div class="row justify-between q-mb-md">
              <div class="column q-px-md" style="width: 50%">
                <div class="q-mb-sm">Email</div>
                <div>
                  <q-input
                    class="my-custom-input"
                    outlined
                    dense
                    v-model="newCustomer.customer_email"
                    placeholder="email@domain.com"
                  ></q-input>
                </div>
              </div>
              <div class="column q-px-md" style="width: 50%">
                <div class="q-mb-sm">Phone</div>
                <div>
                  <q-input
                    class="my-custom-input"
                    outlined
                    dense
                    v-model="newCustomer.customer_phone"
                    placeholder="+62 ..."
                  ></q-input>
                </div>
              </div>
              <div></div>
            </div>
            <div class="row justify-between q-mb-md">
              <div class="column q-px-md" style="width: 100%">
                <div class="q-mb-sm">Address</div>
                <div>
                  <q-input
                    class="my-custom-input"
                    outlined
                    dense
                    v-model="newCustomer.customer_address"
                    placeholder="Customer Address"
                  ></q-input>
                </div>
              </div>
            </div>
            <div class="row justify-between q-mb-md">
              <div class="column q-px-md" style="width: 50%">
                <div class="q-mb-sm">Status</div>
                <div>
                  <q-select
                    :options="['Active', 'Inactive']"
                    class="my-custom-input"
                    outlined
                    dense
                    v-model="newCustomer.customer_status"
                    placeholder="Status"
                  ></q-select>
                </div>
              </div>
            </div>
            <div class="row justify-between q-mb-md">
              <div class="column q-px-md" style="width: 100%">
                <div class="row items-center q-mb-sm justify-between">
                  <div class="">Assign Sales</div>
                  <q-chip
                    dense
                    icon="link"
                    outline
                    style="border: 1px solid #ccc"
                    class="text-black text-weight-medium"
                    >Multi-assign</q-chip
                  >
                </div>
                <div>
                  <q-input
                    class="my-custom-input"
                    outlined
                    dense
                    v-model="searchSalesWhenAdding"
                    placeholder="Search Sales"
                  >
                    <template v-slot:prepend>
                      <q-icon name="search" /> </template
                  ></q-input>
                </div>
              </div>
            </div>
            <q-scroll-area
              class="column q-mx-md q-mb-md"
              style="height: 300px; border-radius: 15px; border: 1px solid #ccc"
            >
              <div
                class="row justify-between items-center q-py-md q-px-lg"
                v-for="opt in salesOptionsComputed"
                :style="
                  opt.sales_name === salesOptionsComputed[0].sales_name
                    ? '  border-top-left-radius: 10px; border-top-right-radius: 10px;'
                    : opt.sales_name ===
                      salesOptionsComputed[salesOptionsComputed.length - 1]
                        .sales_name
                    ? 'border-top: 1px solid #ccc; border-bottom-left-radius: 15px; border-bottom-right-radius: 15px;'
                    : '  border-top: 1px solid #ccc;; '
                "
              >
                <div class="row items-center">
                  <div
                    :class="
                      newCustomer.customer_sales.some(
                        (s) => s.sales_id === opt.sales_id
                      )
                        ? 'q-mr-md bg-black q-pa-sm'
                        : 'q-mr-md bg-grey-3 q-pa-sm'
                    "
                    style="border-radius: 10px"
                  >
                    <q-icon
                      name="group"
                      size="sm"
                      :color="
                        newCustomer.customer_sales.some(
                          (s) => s.sales_id === opt.sales_id
                        )
                          ? 'white'
                          : 'black'
                      "
                    ></q-icon>
                  </div>
                  <div>
                    <div class="text-weight-medium">{{ opt.sales_name }}</div>
                    <div class="text-grey-7 text-weight-medium">
                      ID: {{ opt.sales_id }}
                    </div>
                  </div>
                </div>
                <q-checkbox
                  class="custom-checkbox"
                  v-model="newCustomer.customer_sales"
                  :val="opt"
                />
              </div>
            </q-scroll-area>
          </q-card-section>
          <q-separator></q-separator>
          <q-card-section>
            <header class="row q-px-md justify-between">
              <div class="column"></div>
              <div class="row">
                <q-btn
                  flat
                  class="q-px-lg q-py-sm q-mr-md"
                  style="border-radius: 10px; border: 1px solid #ccc"
                  v-close-popup
                >
                  <div>Cancel</div>
                </q-btn>
                <q-btn
                  :disable="!allowSave()"
                  flat
                  class="q-px-lg q-py-sm bg-black text-white"
                  style="border-radius: 10px; border: 1px solid #ccc"
                  @click="console.log(newCustomer)"
                  v-close-popup
                >
                  <q-icon name="add" class="q-mr-xs"></q-icon>
                  <div>Save</div>
                </q-btn>
              </div>
            </header>
          </q-card-section>
        </div>
      </q-dialog>
      <q-dialog v-model="editCustomerDialog" backdrop-filter="blur(4px)">
        <div style="min-width: 35vw; border-radius: 15px" class="bg-white">
          <q-card-section>
            <header class="row q-px-md justify-between">
              <div class="column">
                <div class="text-grey-7">Master Customer</div>
                <div class="text-h6">Edit Customer</div>
              </div>
              <q-btn icon="close" flat round dense v-close-popup />
            </header>
          </q-card-section>
          <q-separator></q-separator>
          <q-card-section style="max-height: 60vh" class="scroll">
            <div class="row justify-between">
              <div class="column q-px-md" style="width: 50%">
                <div class="q-mb-sm">Customer ID</div>
                <div>
                  <q-input
                    class="my-custom-input"
                    dense
                    outlined
                    type="text"
                    v-model="selectedCustomer.customer_id"
                    placeholder="Customer ID"
                  />
                </div>
              </div>
              <div class="column q-px-md" style="width: 50%">
                <div class="q-mb-sm">Last Activity</div>
                <div>
                  <q-input
                    outlined
                    class="my-custom-input"
                    dense
                    v-model="selectedCustomer.last_activity"
                    placeholder="yyyy/mm/dd"
                    mask="date"
                    :rules="['date']"
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date v-model="selectedCustomer.last_activity">
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>
            </div>
            <div class="row justify-between q-mb-md">
              <div class="column q-px-md" style="width: 100%">
                <div class="q-mb-sm">Customer Name</div>
                <div>
                  <q-input
                    class="my-custom-input"
                    outlined
                    dense
                    v-model="selectedCustomer.customer_name"
                    placeholder="Customer Name"
                  ></q-input>
                </div>
              </div>
            </div>
            <div class="row justify-between q-mb-md">
              <div class="column q-px-md" style="width: 50%">
                <div class="q-mb-sm">Email</div>
                <div>
                  <q-input
                    class="my-custom-input"
                    outlined
                    dense
                    v-model="selectedCustomer.customer_email"
                    placeholder="email@domain.com"
                  ></q-input>
                </div>
              </div>
              <div class="column q-px-md" style="width: 50%">
                <div class="q-mb-sm">Phone</div>
                <div>
                  <q-input
                    class="my-custom-input"
                    outlined
                    dense
                    v-model="selectedCustomer.customer_phone"
                    placeholder="+62 ..."
                  ></q-input>
                </div>
              </div>
              <div></div>
            </div>
            <div class="row justify-between q-mb-md">
              <div class="column q-px-md" style="width: 100%">
                <div class="q-mb-sm">Address</div>
                <div>
                  <q-input
                    class="my-custom-input"
                    outlined
                    dense
                    v-model="selectedCustomer.customer_address"
                    placeholder="Customer Address"
                  ></q-input>
                </div>
              </div>
            </div>
            <div class="row justify-between q-mb-md">
              <div class="column q-px-md" style="width: 50%">
                <div class="q-mb-sm">Status</div>
                <div>
                  <q-select
                    :options="['Active', 'Inactive']"
                    class="my-custom-input"
                    outlined
                    dense
                    v-model="selectedCustomer.customer_status"
                    placeholder="Status"
                  ></q-select>
                </div>
              </div>
            </div>
            <div class="row justify-between q-mb-md">
              <div class="column q-px-md" style="width: 100%">
                <div class="row items-center q-mb-sm justify-between">
                  <div class="">Assign Sales</div>
                  <q-chip
                    dense
                    icon="link"
                    outline
                    style="border: 1px solid #ccc"
                    class="text-black text-weight-medium"
                    >Multi-assign</q-chip
                  >
                </div>
                <div>
                  <q-input
                    class="my-custom-input"
                    outlined
                    dense
                    v-model="searchSalesWhenAdding"
                    placeholder="Search Sales"
                  >
                    <template v-slot:prepend>
                      <q-icon name="search" /> </template
                  ></q-input>
                </div>
              </div>
            </div>
            <q-scroll-area
              class="column q-mx-md q-mb-md"
              style="height: 300px; border-radius: 15px; border: 1px solid #ccc"
            >
              <div
                class="row justify-between items-center q-py-md q-px-lg"
                v-for="opt in salesOptionsComputed"
                :style="
                  opt.sales_name === salesOptionsComputed[0].sales_name
                    ? '  border-top-left-radius: 10px; border-top-right-radius: 10px;'
                    : opt.sales_name ===
                      salesOptionsComputed[salesOptionsComputed.length - 1]
                        .sales_name
                    ? 'border-top: 1px solid #ccc; border-bottom-left-radius: 15px; border-bottom-right-radius: 15px;'
                    : '  border-top: 1px solid #ccc;; '
                "
              >
                <div class="row items-center">
                  <div
                    :class="
                      newCustomer.customer_sales.some(
                        (s) => s.sales_id === opt.sales_id
                      )
                        ? 'q-mr-md bg-black q-pa-sm'
                        : 'q-mr-md bg-grey-3 q-pa-sm'
                    "
                    style="border-radius: 10px"
                  >
                    <q-icon
                      name="group"
                      size="sm"
                      :color="
                        newCustomer.customer_sales.some(
                          (s) => s.sales_id === opt.sales_id
                        )
                          ? 'white'
                          : 'black'
                      "
                    ></q-icon>
                  </div>
                  <div>
                    <div class="text-weight-medium">{{ opt.sales_name }}</div>
                    <div class="text-grey-7 text-weight-medium">
                      ID: {{ opt.sales_id }}
                    </div>
                  </div>
                </div>
                <q-checkbox
                  class="custom-checkbox"
                  v-model="selectedCustomer.customer_sales"
                  :val="opt"
                />
              </div>
            </q-scroll-area>
          </q-card-section>
          <q-separator></q-separator>
          <q-card-section>
            <header class="row q-px-md justify-between">
              <div class="column"></div>
              <div class="row">
                <q-btn
                  flat
                  class="q-px-lg q-py-sm q-mr-md"
                  style="border-radius: 10px; border: 1px solid #ccc"
                  v-close-popup
                >
                  <div>Cancel</div>
                </q-btn>
                <q-btn
                  :disable="!allowSave()"
                  flat
                  class="q-px-lg q-py-sm bg-black text-white"
                  style="border-radius: 10px; border: 1px solid #ccc"
                  @click="console.log(newCustomer)"
                  v-close-popup
                >
                  <q-icon name="add" class="q-mr-xs"></q-icon>
                  <div>Save</div>
                </q-btn>
              </div>
            </header>
          </q-card-section>
        </div>
      </q-dialog>
    </div>
  </div>
</template>
<script setup lang="ts">
import { QTableColumn } from "quasar";
import { Customer } from "src/components/Types.vue";
import { computed, ref } from "vue";

const searchSalesWhenAdding = ref("");

const editCustomerDialog = ref(false);

const newCustomerDialog = ref(false);
const newCustomer = ref<Customer>({
  customer_id: "",
  customer_name: "",
  customer_email: "",
  customer_phone: "",
  customer_status: "Active",
  customer_address: "",
  customer_sales: [],
  last_activity: "",
});

const detailCustomerDialog = ref(false);
const selectedCustomer = ref<Customer>();

const searchModel = ref("");

const searchSalesModel = ref("");

const allowSave = () => {
  if (
    newCustomer.value.customer_address &&
    newCustomer.value.customer_email &&
    newCustomer.value.customer_name &&
    newCustomer.value.customer_phone &&
    newCustomer.value.customer_status
  ) {
    return true;
  }
  return false;
};

const salesOptionsComputed = computed(() => {
  const keyword = searchSalesWhenAdding.value.trim().toLowerCase();

  if (!keyword) {
    return salesOptions;
  }

  return salesOptions.filter((sales) =>
    sales.sales_name.toLocaleLowerCase().includes(keyword)
  );
});

const salesOptions = [
  { sales_id: "s-01", sales_name: "Alya (Sales)" },
  { sales_id: "s-02", sales_name: "Raka (Sales)" },
  { sales_id: "s-03", sales_name: "Dimas (Sales)" },
  { sales_id: "s-04", sales_name: "Nadia (Sales)" },
  { sales_id: "s-05", sales_name: "Kevin (Sales)" },
];

const filterModeModel = ref("Latest Activity");
const filterModeOptions = [
  "Latest Activity",
  "Earliest Activity",
  "Name A-Z",
  "Name Z-A",
];

const filterButtonModel = ref("All");

const customers = [
  {
    customer_id: "CUST-10023",
    customer_name: "Mitra Karya Sejahtera",
    customer_email: "finance@mitrakarya.com",
    customer_phone: "0813-7788-9900",
    customer_status: "Active",
    customer_address: "Jl. Raya Serpong No. 88, Tangerang Selatan, Banten",
    customer_sales: [
      { sales_id: "s-02", sales_name: "Raka (Sales)" },
      { sales_id: "s-04", sales_name: "Nadia (Sales)" },
      { sales_id: "s-05", sales_name: "Kevin (Sales)" },
    ],
    last_activity: "28-12-2025",
  },
  {
    customer_id: "CUST-10024",
    customer_name: "Sinar Abadi Nusantara",
    customer_email: "admin@sinarabadi.co.id",
    customer_phone: "0812-3344-5566",
    customer_status: "Active",
    customer_address: "Jl. Gatot Subroto Kav. 23, Jakarta Selatan, DKI Jakarta",
    customer_sales: [
      { sales_id: "s-01", sales_name: "Alya (Sales)" },
      { sales_id: "s-03", sales_name: "Dimas (Sales)" },
    ],
    last_activity: "02-01-2026",
  },
  {
    customer_id: "CUST-10025",
    customer_name: "Prima Logistik Indonesia",
    customer_email: "contact@primalogistik.id",
    customer_phone: "0821-9988-7766",
    customer_status: "Inactive",
    customer_address: "Jl. Industri Raya Blok C3, Bekasi, Jawa Barat",
    customer_sales: [{ sales_id: "s-04", sales_name: "Nadia (Sales)" }],
    last_activity: "15-11-2025",
  },
  {
    customer_id: "CUST-10026",
    customer_name: "Berkah Jaya Makmur",
    customer_email: "finance@berkahjaya.com",
    customer_phone: "0817-6655-4433",
    customer_status: "Active",
    customer_address: "Jl. Ahmad Yani No. 45, Surabaya, Jawa Timur",
    customer_sales: [
      { sales_id: "s-02", sales_name: "Raka (Sales)" },
      { sales_id: "s-05", sales_name: "Kevin (Sales)" },
    ],
    last_activity: "30-12-2025",
  },
  {
    customer_id: "CUST-10027",
    customer_name: "Global Teknologi Utama",
    customer_email: "billing@globaltek.co.id",
    customer_phone: "0819-2233-4455",
    customer_status: "Active",
    customer_address: "Jl. Diponegoro No. 12, Bandung, Jawa Barat",
    customer_sales: [
      { sales_id: "s-01", sales_name: "Alya (Sales)" },
      { sales_id: "s-02", sales_name: "Raka (Sales)" },
      { sales_id: "s-03", sales_name: "Dimas (Sales)" },
    ],
    last_activity: "05-01-2026",
  },
  {
    customer_id: "CUST-10028",
    customer_name: "Cahaya Timur Sejahtera",
    customer_email: "cs@cahayatimur.id",
    customer_phone: "0822-1100-3344",
    customer_status: "Inactive",
    customer_address: "Jl. Yos Sudarso No. 101, Makassar, Sulawesi Selatan",
    customer_sales: [],
    last_activity: "20-10-2025",
  },
];

const columns: QTableColumn[] = [
  {
    name: "customer_id",
    label: "ID",
    field: "customer_id",
    align: "left",
    sortable: true,
  },
  {
    name: "customer",
    label: "CUSTOMER",
    field: "customer",
    align: "left",
    sortable: true,
  },
  {
    name: "customer_status",
    label: "STATUS",
    field: "customer_status",
    align: "left",
    sortable: true,
  },
  {
    name: "customer_sales",
    label: "ASSIGN SALES",
    field: "customer_sales",
    align: "left",
    sortable: true,
  },
  {
    name: "last_activity",
    label: "LAST ACTIVITY",
    field: "last_activity",
    align: "left",
    sortable: true,
  },
  {
    name: "button",
    label: "",
    field: "button",
    align: "left",
    sortable: true,
  },
  {
    name: "action",
    label: "Action",
    field: "action",
    align: "left",
    sortable: true,
  },
];

const rows = computed(() => {
  const keyword = searchModel.value.trim().toLowerCase();

  if (!keyword) {
    return customers;
  }

  return customers.filter((customer) =>
    customerToSearchString(customer).includes(keyword)
  );
});

const customerToSearchString = (customer: any): string => {
  return [
    customer.customer_id,
    customer.customer_name,
    customer.customer_email,
    customer.customer_phone,
    customer.customer_status,
    customer.last_activity,

    // flatten sales
    customer.customer_sales
      ?.map((s: any) => `${s.sales_id} ${s.sales_name}`)
      .join(" "),
  ]
    .join(" ")
    .toLowerCase();
};

function daysAgo(dateStr: string): number {
  const [day, month, year] = dateStr.split("-").map(Number);

  const inputDate = new Date(year, month - 1, day);
  const today = new Date();

  // Normalize to midnight
  inputDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffMs = today.getTime() - inputDate.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  return diffDays;
}

function formatDate(dateStr: string): string {
  const [day, month, year] = dateStr.split("-").map(Number);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return `${day} ${months[month - 1]} ${year}`;
}
</script>
<style lang="scss">
.my-custom-input {
  .q-field__control {
    border-radius: 10px; /* Apply your specific border-radius here */
  }
  &.q-field--outlined .q-field__control:before {
    border-radius: 10px; /* Ensures the outline pseudo-element also has the radius */
  }
}
.custom-checkbox .q-checkbox__bg {
  border-radius: 50%; // Adjust the value as needed
}
</style>
